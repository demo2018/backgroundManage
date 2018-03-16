import { doctorStatus, doctorSource, isShow } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '医生ID',
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
    key: 'hospitalName',
    name: '执业医院'
  },
  {
    key: 'source',
    name: '来源',
    enums: doctorSource,
    sorter: true,
  },
  {
    key: 'status',
    name: '状态',
    enums: doctorStatus,
    sorter: true,
  },
  {
    key: 'rank',
    name: '排序',
    sorter: true,
  },
  {
    key: 'addDate',
    name: '入驻时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'isShow',
    name: '是否显示',
    enums: isShow
  },
  {
    key: 'option',
    name: '操作'
  }
];
