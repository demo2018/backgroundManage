import { isShow } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '诊所ID',
    sorter: true,
  },
  {
    key: 'name',
    name: '诊所名称'
  },
  {
    key: 'address',
    name: '诊所位置'
  },
  {
    key: 'toothChairNum',
    name: '牙椅数量'
  },
  {
    key: 'telephone',
    name: '诊所电话'
  },
  {
    key: 'leader',
    name: '诊所负责人'
  },
  {
    key: 'rank',
    name: '排序'
  },
  {
    key: 'isEnable',
    name: '是否启用',
    enums: isShow,
    sorter: true,
  },
  {
    key: 'establishDate',
    name: '合作日期',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
