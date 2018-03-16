import serverConfigs from 'configs/servers';
import cookie from 'js-cookie';
import qs from 'qs';
import moment from 'moment';
import SITE from './site';

export function getDeployEnv(deployEnv) {
  if (arguments.length) {
    window.$$cachedEnv = window.DEPLOY_ENV || deployEnv || localStorage.getItem('DEPLOY_ENV') || 'dev';
  }
  return window.$$cachedEnv;
}

export function getServer(servers = serverConfigs) {
  return servers[getDeployEnv(process.env.DEPLOY_ENV)];
}

// 获取图片上传接口地址
export function getUploadPicUrl(params = {}) {
  return `${getServer().disease}/bhyy/core/image?${qs.stringify(params)}`;
}

/**
 * 获取用户所拥有权限能看到的菜单项
 * 菜单显示顺序以本系统配置为准，和权限系统配置的顺序无关，但是层级要一致
 * @param {*} userMenus 权限系统返回的当前用户所拥有的菜单配置
 * @param {*} menus 本系统完整的菜单项
 */
export function getMenus(userMenus = [], menus = []) {
  const items = [];
  if (!userMenus) return [];

  menus.forEach((item) => {
    const userMenuItem = userMenus.find(({ uri }) => item.key == uri);
    if (userMenuItem) {
      const tmpItem = { ...item };

      if (item.children && userMenuItem.children) {
        tmpItem.children = getMenus(userMenuItem.children, item.children);
      }
      items.push(tmpItem);
    }
  });

  return items;
}

export function formatObjValue(key, obj) {
  const value = obj[key];
  return value != undefined ? value.toString() : '---';
}

export const getRegionName = ({ provinceId, cityId, countyId }, spe = '-') => {
  const adressName = [];
  if (provinceId) {
    let provinceName = '';
    if (provinceId == -1) {
      provinceName = '全国';
    } else {
      provinceName = SITE[0][provinceId] || '';
    }
    adressName.push(provinceName);
  }
  if (cityId && cityId != -1) {
    const cityObj = SITE['0,' + provinceId];
    const cityName = cityObj && cityObj[cityId] ? cityObj[cityId] : '';
    adressName.push(cityName);
  }
  if (countyId && countyId != -1) {
    const countryObj = SITE['0,' + provinceId + ',' + cityId];
    const countyName = countryObj && countryObj[countyId] ? countryObj[countyId] : '';
    adressName.push(countyName);
  }
  return adressName.join(spe);
};

export const formatName = (userName, workNo, step) => {
  const workNoStr = step ? `${step} ${workNo}` : `(${workNo})`;
  return userName
    ? userName + (workNo ? workNoStr : '')
    : workNo;
};

export const formatNameAndWorkno = formatName;

// 格式化moment值为字符串
export const formatDate = (date, type = 'YYYY-MM-DD') => {
  return date ? moment(date).format(type) : '';
};

// 格式化字符串为日期区间
export const getDateRangeValue = (createStartTime, createEndTime) => {
  const startTime = createStartTime ? moment(createStartTime) : null;
  const endTime = createEndTime ? moment(createEndTime) : null;
  return [startTime, endTime];
};

/**
 * 获取n天的时间段
 * @param {Number} range 天数
 * @param {String} type 数据格式
 */
export const formatRangeTime = (range = 0, type = 'YYYY-MM-DD') => {
  const beginDate = moment().add(range, 'days').format(type);
  const endDate = moment().format(type);
  const initSearchTime = { beginDate, endDate };
  return initSearchTime;
};

export const getOptionsFromDict = (dict = [], type) => {
  const options = {};
  dict.forEach(({ key, value }) => {
    if (key === type) {
      value.forEach(({ id, dictName }) => {
        options[id] = dictName;
      });
    }
  });
  return options;
};

export const addEnumsToFields = (fields, enumsObj) => {
  const enumKeys = Object.keys(enumsObj);
  return fields.map((item) => {
    const { key } = item;
    if (enumKeys.includes(key)) {
      item.enums = enumsObj[key];
    }
    return item;
  });
};

// 导出
export const downFile = ({ server, url, params }) => {
  const token = {
    sid: cookie.get('sid'),
    st: cookie.get('st')
  };
  window.location.href = `${getServer()[server]}${url}?${qs.stringify(Object.assign(token, params))} `;
};

export const pickFields = (fields, businessType) => {
  return Object.keys(fields)
    .filter((key) => {
      return key === 'default' || key === businessType;
    })
    .reduce((arr, key) => {
      return arr.concat(fields[key]);
    }, []);
};

// 判断是否为纯对象
export function isObject(source) {
  return Object.prototype.toString.call(source) === '[object Object]';
}

// 处理table多层嵌套结构数据，提取到同级 {a:{a:a:{'123'}}}=>{'a_a_a':'123'};
export const flattenDeep = (parentkey, source) => {
  let newData = {};
  Object.keys(source).forEach((key) => {
    const newKey = parentkey ? `${parentkey}_${key}` : key;
    if (source[key] && isObject(source[key])) {
      newData = { ...newData, ...flattenDeep(newKey, source[key]) };
    } else {
      newData[newKey] = source[key];
    }
  });
  return newData;
};

// 数字转化为千分位 1568=> 1,568
export const numToLocaleString = (source) => {
  if (source && typeof source === 'number') {
    return source.toLocaleString();
  }
  return source;
};

// 获取枚举值名称
export const getEnumsName = (enums = {}, findValue) => {
  if (Array.isArray(enums)) {
    const enumResult = enums.find(({ value }) => (value === findValue)) || {};
    return enumResult.label || '';
  }
  return enums[findValue] || '';
};

// 获取对象深层值
export const getValueFromObject = (datas = {}, keyStr) => {
  if (!keyStr) {
    return '';
  }
  const keys = keyStr.split('.');
  return keys.reduce((findDatas = {}, key) => {
    return findDatas[key];
  }, datas);
};

// 创建支持路由嵌套的页面
export function createNestPage(Comp) {
  return (props) => {
    const { children, ...others } = props;
    return children || <Comp {...others} />;
  };
}

export function toString(date, format = 'YYYY-MM-DD HH:mm:ss') {
  if (date == null || date === undefined) {
    return '';
  }
  if (!(date instanceof moment)) {
    date = moment(date);
  }
  return date.format(format);
}

// 转换为日期时间格式 'YYYY-MM-DD HH:mm:ss
export function toDateTimeString(date) {
  return toString(date, 'YYYY-MM-DD HH:mm:ss');
}

// 提交数据格式化
export const formatFormData = ({ pn, ps, sortField = '', ordination = '', ...others }) => {
  const newSortField = sortField.replace(/([A-Z])/g, '_$1').toLowerCase();
  const sort = (sortField && ordination) ? `${newSortField},${ordination.toLowerCase()}` : undefined;
  others = Object.keys(others).reduce((formData, key) => {
    if (others[key] || others[key] === 0) {
      formData[key] = others[key];
    }
    return formData;
  }, {});
  return { ...others, page: pn - 1, size: ps, sort };
};
