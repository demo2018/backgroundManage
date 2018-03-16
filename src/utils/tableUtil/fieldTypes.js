import moment from 'moment';
import Type from '../type';

const getParsedDate = (date, format) => {
  return Type.isNill(date) || Type.isEmpty(date) ? '' : moment(date).format(format);
};

/*
 * column类型定义
 */
const fieldTypes = {
  normal: value => value,
  text: value => value,
  textarea: value => value,
  number: value => value,
  boolean: value => (value === 'true' || value === true ? '是' : '否'),
  date: value => getParsedDate(value, 'YYYY-MM-DD'),
  datetime: value => getParsedDate(value, 'YYYY-MM-DD HH:mm:ss'),
  time: value => getParsedDate(value, 'HH:mm:ss'),
  month: value => getParsedDate(value, 'YYYY-MM'),
  dateRange: value => {
    if (!Type.isArray(value)) {
      return '';
    }
    const start = getParsedDate(value[0], 'YYYY-MM-DD');
    const end = getParsedDate(value[1], 'YYYY-MM-DD');
    return `${start} - ${end}`;
  },
  datetimeRange: value => {
    if (!Type.isArray(value)) {
      return '';
    }
    const start = getParsedDate(value[0], 'YYYY-MM-DD HH:mm:ss');
    const end = getParsedDate(value[1], 'YYYY-MM-DD HH:mm:ss');
    return `${start} - ${end}`;
  },
  monthRange: value => {
    if (!Type.isArray(value)) {
      return '';
    }
    const start = getParsedDate(value[0], 'YYYY-MM');
    const end = getParsedDate(value[1], 'YYYY-MM');
    return `${start} - ${end}`;
  },
  range: value => {
    if (!Type.isArray(value)) {
      return '';
    }
    return value.join('-');
  },
  enum: (value, { enums }) => {
    let enumValue;
    if (Type.isNill(value)) {
      enumValue = '';
    } else if (Type.isObject(enums)) {
      enumValue = enums[value];
    } else if (Type.isArray(enums)) {
      enumValue = (enums.find(x => x.value === value) || {}).label || value;
    }
    return enumValue;
  },
  enumGroup: (value, { options }) => {
    let enumGroup = [];
    if (!Type.isArray(value)) {
      enumGroup = [value];
    } else if (Type.isObject(options)) {
      enumGroup = value.map(v => options[v]);
    } else if (Type.isArray(options)) {
      enumGroup = value.map(v => (options.find(x => x.value === v) || {}).label);
    }
    return enumGroup.filter(v => v !== undefined && v !== '').join(',');
  },
  cascader: (value, { options }) => {
    let cascader = [];
    if (!Type.isArray(value)) {
      cascader = [value];
    } else if (!Type.isArray(options)) {
      cascader = value;
    } else {
      cascader = [];
      let opts = options;
      for (let index = 0; index < value.length; index++) {
        const opt = opts.find(x => x.value === value[index]);
        if (!opt) {
          cascader = [];
          break;
        }
        cascader.push(opt.label);
        opts = opt.children;
      }
    }
    return cascader.filter(v => v !== undefined && v !== '').join('/');
  }
};

/*
 * 扩展column类型定义
 */
export const combineTypes = types => {
  Object.assign(fieldTypes, types);
};

export default fieldTypes;
