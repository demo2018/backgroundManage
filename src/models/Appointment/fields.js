import { appointmentStatus, appointmentSource } from 'configs/constants';

export const fields = [
  {
    key: 'appointId',
    name: '预约单号',
    sorter: true,
  },
  {
    key: 'customerName',
    name: '就诊人姓名'
  },
  {
    key: 'phone',
    name: '手机号码'
  },
  {
    key: 'itemClassId',
    name: '预约项目'
  },
  {
    key: 'source',
    name: '预约来源',
    enums: appointmentSource,
    sorter: true,
  },
  {
    key: 'doctorName',
    name: '预约医生'
  },
  {
    key: 'status',
    name: '预约状态',
    enums: appointmentStatus,
    sorter: true,
  },
  {
    key: 'time',
    name: '就诊时间',
    // type: 'datetime',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
