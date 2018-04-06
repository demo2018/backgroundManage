import { genderType, sendStatus, treatmentType } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '就诊病例ID',
    sorter: true
  },
  {
    key: 'customerName',
    name: '姓名'
  },
  {
    key: 'gender',
    name: '性别',
    enums: genderType
  },
  {
    key: 'phone',
    name: '手机号码'
  },
  {
    key: 'type',
    name: '初／复诊',
    enums: treatmentType
  },
  {
    key: 'itemName',
    name: '诊疗项目'
  },
  {
    key: 'doctorName',
    name: '医生'
  },
  {
    key: 'isSend',
    name: '状态',
    enums: sendStatus,
    sorter: true
  },
  {
    key: 'time',
    name: '就诊时间',
    sorter: true
  },
  {
    key: 'option',
    name: '操作'
  }
];
