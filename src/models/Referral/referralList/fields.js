import { referralStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '转诊ID',
    sorter: true,
  },
  {
    key: 'customerName',
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
    enums: referralStatus,
    sorter: true,
  },
  {
    key: 'operationTime',
    name: '操作时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'type',
    name: '奖励方式',
    enums: referralStatus,
    sorter: true,
  },
  {
    key: 'num',
    name: '金额/数量',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
