import { treatmentType, treatmentStatus } from 'configs/constants';

export const fields = [
  {
    key: 'treatmentId',
    name: '就诊病例ID'
  },
  {
    key: 'name',
    name: '姓名'
  },
  {
    key: 'phone',
    name: '性别'
  },
  {
    key: 'treatmentItem',
    name: '手机号'
  },
  {
    key: 'type',
    name: '就诊时间',
    type: 'datetime'
  },
  {
    key: 'doctorName',
    name: '初／复诊',
    enums: treatmentStatus
  },
  {
    key: 'treatmentStatus',
    name: '诊疗项目',
    enums: treatmentStatus
  },
  {
    key: 'treatmentStatus2',
    name: '医生',
    enums: treatmentStatus
  },
  {
    key: 'status',
    name: '状态',
  },
  {
    key: 'id',
    name: '操作'
  }
];
