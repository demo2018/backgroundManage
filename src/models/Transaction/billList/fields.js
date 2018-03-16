import { treatmentStatus } from 'configs/constants';

export const fields = [
  {
    key: 'billId',
    name: '账单号'
  },
  {
    key: 'patientName',
    name: '患者姓名'
  },
  {
    key: 'phone',
    name: '手机号'
  },
  {
    key: 'doctorName',
    name: '医生姓名'
  },
  {
    key: 'hospitalName',
    name: '诊所名称',
  },
  {
    key: 'createTime',
    name: '就诊时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'itemName',
    name: '项目',
    // enums: treatmentStatus
  },
  {
    key: 'originalCost',
    name: '原价',
  },
  {
    key: 'actualCost',
    name: '支付金额',
  },
  {
    key: 'status',
    name: '状态',
    enums: treatmentStatus,
    sorter: true,
  },
  {
    key: 'payType',
    name: '支付方式',
    enums: treatmentStatus,
    sorter: true,
  },
  {
    key: 'isOnSale',
    name: '优惠情况',
    enums: treatmentStatus,
    sorter: true,
  },
  {
    key: 'id',
    name: '操作'
  }
];
