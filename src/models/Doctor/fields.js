import { doctorStatus, doctorSource, isShow, weekDay, bookStatus } from 'configs/constants';

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

export const datefields = [
  {
    key: 'id',
    name: '出诊ID',
    sorter: true,
  },
  {
    key: 'date',
    name: '出诊日期',
    type: 'date',
    sorter: true,
  },
  {
    key: 'dayOfWeek',
    name: '星期',
    enums: weekDay
  },
  {
    key: 'startTime',
    name: '初诊时间'
  },
  {
    key: 'endTime',
    name: '终诊时间'
  },
  {
    key: 'hospitalName',
    name: '出诊医院'
  },
  {
    key: 'status',
    name: '状态',
    enums: bookStatus,
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
