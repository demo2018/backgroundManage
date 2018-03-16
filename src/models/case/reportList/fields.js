import { treatmentType, treatmentStatus } from 'configs/constants';

export const fields = [
  {
    key: 'treatmentId',
    name: '初筛报告ID'
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
    name: '机构名称',
    enums: treatmentType
  },
  {
    key: 'doctorName',
    name: '就诊时间',
    enums: treatmentStatus
  },
  {
    key: 'treatmentStatus',
    name: '医生',
    enums: treatmentStatus
  },
  {
    key: 'clinicTime',
    name: '状态',
    sorter: true,
  },
  {
    key: 'id',
    name: '操作'
  }
];
