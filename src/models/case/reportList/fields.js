import { genderType, sendStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '初筛报告ID',
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
    key: 'itemName',
    name: '机构名称'
  },
  {
    key: 'doctorName',
    name: '医生姓名'
  },
  {
    key: 'isSend',
    name: '状态',
    enums: sendStatus,
    sorter: true
  },
  {
    key: 'time',
    name: '筛查时间',
    sorter: true
  },
  {
    key: 'option',
    name: '操作'
  }
];
