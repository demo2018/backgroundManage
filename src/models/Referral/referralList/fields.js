import { doctorStatus } from 'configs/constants';

export const fields = [
  {
    key: 'referralId',
    name: '转诊ID',
    sorter: true,
  },
  {
    key: 'realName',
    name: '患者姓名'
  },
  {
    key: 'phone',
    name: '手机号码'
  },
  {
    key: 'doctorName',
    name: '医生姓名'
  },
  {
    key: 'status',
    name: '状态',
    enums: doctorStatus,
    sorter: true,
  },
  {
    key: 'addDate',
    name: '操作时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'award',
    name: '奖励方式',
    enums: doctorStatus,
    sorter: true,
  },
  {
    key: 'number',
    name: '金额/数量',
    sorter: true,
  },
  {
    key: 'id',
    name: '操作'
  }
];
