import qs from 'qs';
import { Modal, message } from 'antd';
import { Promise } from 'es6-promise';
import cookie from 'js-cookie';
import { getServer as getDeployEnv } from 'utils/common';

function toFormData(originData) {
  if (!originData) return null;

  const formData = new FormData();
  function transformToFormData(formData, data, parentKey) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof window.File)
    ) {
      Object.keys(data).forEach((key) => {
        let tempKey;
        if (Array.isArray(data)) {
          tempKey = parentKey ? `${parentKey}[${key}]` : key;
        } else {
          tempKey = parentKey ? `${parentKey}.${key}` : key;
        }
        transformToFormData(
          formData,
          data[key],
          tempKey
        );
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  }
  transformToFormData(formData, originData);
  return formData;
}


const applyFn = (paramOrFn, _request, _response) => {
  return typeof paramOrFn === 'function' ? paramOrFn(_request, _response) : paramOrFn;
};

const transform = (defaults) => {
  return {
    request(_request) {
      const requestTransforms = _request.config.requestTransform || defaults.requestTransform || [];
      if (requestTransforms.length) {
        _request.options.pass = true;
        requestTransforms.forEach(requestTransform => {
          _request = requestTransform(_request);
        });
      }
      return _request;
    },
    response(_response, _request) {
      const responseTransforms = _response.config.responseTransform || defaults.responseTransform || [];
      responseTransforms.forEach(responseTransform => {
        _response = responseTransform(_response);
      });
      _request.options.pass = true;
      return _response;
    }
  };
};

/*
 * request domain 中间件
 * useMockProxyType 使用mock代理类别：0 - 仅使用mock数据；1 - 部分使用mock数据；2 - 不使用mock数据
 */
function requestDomain(_hosts) {
  return {
    request(_request) {
      const { url, options } = _request;
      const { domain, servers, headers, useMockProxyType = 1 } = options;
      const hosts = applyFn(_hosts, _request) || servers || {};
      const host = hosts[domain] || '';
      const enableMockProxy = getDeployEnv() === 'local' && useMockProxyType !== 2;

      if (enableMockProxy) {
        _request.options.headers = {
          ...headers,
          'Host-Proxy': host,
          'Only-Mock-Data': !useMockProxyType
        };
      } else {
        _request.url = `${host}${url}`;
      }
      return _request;
    }
  };
}

/*
 * request query 中间件
 */
function requestQuery(_tokens) {
  return {
    request(_request) {
      const { options } = _request;
      const tokens = applyFn(_tokens || options.query, _request);

      if (tokens) {
        const url = _request.url;
        const tokenStr = qs.stringify(tokens);
        const connector = url.includes('?') ? '&' : '?';
        _request.url = `${url}${connector}${tokenStr}`;
      }

      return _request;
    }
  };
}

/*
 * request headers 中间件
 */
function requestHeader(_header) {
  return {
    request(_request) {
      const { options } = _request;
      const headers = applyFn(_header || options.header, _request);
      options.headers = Object.assign({}, options.headers, headers, options.customHeader);
      return _request;
    }
  };
}

/*
 * request headers 中间件
 */
// 参数数据转化中间件
function requestDataTransform(_transform) {
  function requestTypeTransform({ data, options }) {
    const { contentType } = options;

    if (contentType === 'formData') {
      data = toFormData(data);
    } else if (contentType === 'text') {
      options.headers = Object.assign(options.headers || {}, {
        'Content-type': 'text/plain;charset=UTF-8'
      });
    } else if (contentType === 'json') {
      options.headers = Object.assign(options.headers || {}, {
        'Content-type': 'application/json'
      });
    } else if (contentType === 'form') {
      options.headers = Object.assign(options.headers || {}, {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      });
      data = qs.stringify(data);
    }
    return { data, options };
  }

  return {
    request(_request) {
      const { dataTransform, customDataTransform } = _request.options;
      const requestTransform = _transform || dataTransform;

      Object.assign(_request, requestTypeTransform(_request));

      if (requestTransform) {
        const transformedRequest = requestTransform(_request.data, _request.options, _request);
        Object.assign(_request, transformedRequest);
      }

      if (customDataTransform) {
        const transformedRequest = customDataTransform(_request.data, _request.options, _request);
        Object.assign(_request, transformedRequest);
      }

      return _request;
    }
  };
}

/*
 * response status 处理中间件
 */
function responseStatus() {
  return {
    response(_response) {
      if (_response.status >= 200 && _response.status < 300) {
        return _response;
      }

      return _response.json().then((resData) => {
        return Promise.reject(resData);
      }, () => {
        return Promise.reject(_response);
      });
    }
  };
}

/*
 * response json 处理中间件
 */
function responseJson() {
  return {
    response(_response, _request) {
      return _request.options.json === false ? _response : _response.json();
    }
  };
}

/*
 * response data 状态处理中间件
 */
function responseDataStatus(validateStateError) {
  const defaultErrorValidate = (_responseData) => {
    return !_responseData.status;
  };

  return {
    response(_responseData, _request) {
      const { responseDataValidator } = _request.options;

      if (responseDataValidator) {
        if (responseDataValidator(_responseData, _request)) {
          return Promise.reject(_responseData);
        }
      } else {
        if ((validateStateError || defaultErrorValidate)(_responseData)) {
          return Promise.reject(_responseData);
        }
      }

      return _responseData;
    }
  };
}

/*
 * 授权处理中间件，检查是否非法授权
 */
function responseAuthorityValidator(_options) {
  const defaultOptions = {
    codes: ['120001', '120002', '120008'],
    hash: '/login'
  };

  let hasErrorMessage = false;
  const DEFAULT_EXPIRE_MESSAGE = '登录过期，请重新登录！';

  return {
    responseError(_responseError, _request) {
      /* eslint-disable no-shadow */
      const { authorityValidator, authorityFailureCodes, authorityFailureHash, afterAuthorityFailure } = _request.options;
      const authorityOptions = applyFn(_options, _request, _responseError) || defaultOptions;

      if (authorityValidator) {
        return Promise.reject(authorityValidator(_responseError, _request) || _responseError);
      }

      if (authorityFailureCodes) {
        authorityOptions.codes = authorityFailureCodes;
      }

      if (authorityFailureHash) {
        authorityOptions.hash = authorityFailureHash;
      }

      if (authorityOptions.codes.includes(_responseError.errorCode)) {
        if (!hasErrorMessage) {
          const responseMsg = _responseError.error && _responseError.error.message;
          const errorMessage = responseMsg || DEFAULT_EXPIRE_MESSAGE;
          message.warning(errorMessage, 2, () => (hasErrorMessage = false));

          if (afterAuthorityFailure) {
            afterAuthorityFailure(_responseError, _request);
          }

          cookie.set('lastHash', window.location.hash);
          _request.options.ignoreErrorModal = true;
          hasErrorMessage = true;
        }

        window.location.hash = authorityOptions.hash;
      }

      return Promise.reject(_responseError);
    }
  };
}


/*
 * response错误处理中间件
 */
function responseErrorHandler() {
  const DEFAULT_RES_ERROR = '请求错误';
  let hasErrorModal = false;

  function defaultResponseErrorHandler(_responseError, _request) {
    if (!_request.options.ignoreErrorModal && !hasErrorModal) {
      const responseMsg = _responseError.error && _responseError.error.message;
      const title = _responseError.message || responseMsg || _responseError.error_message || DEFAULT_RES_ERROR;
      Modal.error({
        title,
        onOk() {
          hasErrorModal = false;
        },
        onCancel: () => {}
      });
      hasErrorModal = true;
    }
  }

  return {
    responseError(_responseError, _request) {
      const { responseErrorHandler, customResponseErrorHandler } = _request.options;
      let _responseErrorResult;
      if (customResponseErrorHandler) {
        _responseErrorResult = customResponseErrorHandler(_responseError, _request);
      }

      (responseErrorHandler || defaultResponseErrorHandler)(_responseError, _request);

      return Promise.reject(_responseErrorResult || _responseError);
    }
  };
}

/*
 * request错误处理中间件
 */
function requestErrorHandler() {
  const DEFAULT_REQ_ERROR = '请求异常';
  let hasErrorModal = false;

  function defaultRequestErrorHandler(_requestError) {
    if (!hasErrorModal) {
      Modal.error({
        title: DEFAULT_REQ_ERROR,
        onOk() {
          hasErrorModal = false;
        }
      });
      hasErrorModal = true;
    }
    return Promise.reject(_requestError);
  }

  return {
    requestError(_requestError) {
      const { requestErrorHandler, customRequestErrorHandler } = _requestError;
      if (customRequestErrorHandler) {
        return customRequestErrorHandler(_requestError);
      }

      (requestErrorHandler || defaultRequestErrorHandler)(_requestError);
      return Promise.reject(_requestError);
    }
  };
}

/*
 * response data 内容处理中间件
 */
function responseDataContent(contentKey) {
  return {
    response(_response, _request) {
      const key = contentKey || _request.options.contentKey;
      return key ? _response[key] : _response;
    }
  };
}

// need deprecated
function onerror() {
  return {
    responseErrorHandler: responseErrorHandler(),
    requestError: requestErrorHandler()
  };
}

const deprecatedApi = {
  transform,
  onerror,
  dataTransform: requestDataTransform,
  domain: requestDomain,
  queryToken: requestQuery,
  headerToken: requestHeader,
  status: responseStatus,
  json: responseJson,
  dataStatus: responseDataStatus,
  authFailed: responseAuthorityValidator,
  content: responseDataContent,
};

export default {
  ...deprecatedApi,
  requestDomain,
  requestQuery,
  requestHeader,
  requestDataTransform,
  requestErrorHandler,
  responseStatus,
  responseJson,
  responseDataStatus,
  responseAuthorityValidator,
  responseErrorHandler,
  responseDataContent
};
