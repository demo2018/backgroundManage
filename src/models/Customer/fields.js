import { sourceStatus, genderType, relationStatus } from 'configs/constants';

export const customeFields = [
  {
    key: 'id',
    name: '用户ID',
    sorter: true,
  },
  {
    key: 'realName',
    name: '姓名'
  },
  {
    key: 'phone',
    name: '手机号码'
  },
  {
    key: 'source',
    name: '客户来源',
    enums: sourceStatus,
    sorter: true,
  },
  {
    key: 'appointNum',
    name: '预约次数',
    sorter: true,
  },
  {
    key: 'treatNum',
    name: '就诊次数',
    sorter: true,
  },
  {
    key: 'payMoney',
    name: '支付金额',
    sorter: true,
  },
  {
    key: 'createTime',
    name: '注册时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
export const memberFields = [
  {
    key: 'realName',
    name: '姓名'
  },
  {
    key: 'gender',
    name: '性别',
    enums: genderType
  },
  {
    key: 'relation',
    name: '关系',
    enums: relationStatus
  },
  {
    key: 'age',
    name: '年龄',
  },
  {
    key: 'phone',
    name: '手机号',
  },
  {
    key: 'option',
    name: '操作'
  }
];
