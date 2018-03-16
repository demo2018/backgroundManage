import R from 'ramda';

// 判断是否为字符串
function isString(source) {
  return R.is(String, source);
}

// 判断是否为数组
function isArray(source) {
  return Array.isArray(source);
}

// 判断是否为纯对象
function isObject(source) {
  return Object.prototype.toString.call(source) === '[object Object]';
}

// 判断是否为函数
function isFunction(source) {
  return R.is(Function, source);
}

// 判断是否为数字
function isNumber(source) {
  return R.is(Number, source);
}

// 判断是否为整数
function isInt(source) {
  return Number.isInteger(source);
}

// 判断是否为空(空字符串，空对象，空树组)
function isEmpty(source) {
  return R.isEmpty(source);
}

// 判断是否等于null或者undefined
function isNill(source) {
  return R.isNil(source);
}

export default {
  isString,
  isArray,
  isObject,
  isFunction,
  isNumber,
  isInt,
  isEmpty,
  isNill,
};

