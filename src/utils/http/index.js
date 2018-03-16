import Http from './Http';
import { Modal } from 'antd';
import cookie from 'js-cookie';
import { getServer } from 'utils/common';

let hasErrorModal = false;

export default Http.create({
  servers: getServer(),
  contentType: 'json',
  header: {
    Authorization: 'aaaa',
  },
  authorityFailureHash: '/login',
  responseErrorHandler(_responseError, _request) {
    if (!_request.options.ignoreErrorModal && !hasErrorModal) {
      const responseMsg = _responseError.error && _responseError.error.message;
      const title = responseMsg || '网络连接错误，请稍后……';
      Modal.error({
        title,
        onOk: () => {
          hasErrorModal = false;
        },
        onCancel: () => { },
      });
      hasErrorModal = true;
    }
  }
});
