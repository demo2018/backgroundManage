import { treatmentStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '项目ID',
    sorter: true,
  },
  {
    key: 'icon',
    name: '项目icon'
  },
  {
    key: 'name',
    name: '项目名称'
  },
  {
    key: 'price',
    name: '价格'
  },
  {
    key: 'unit',
    name: '单位'
  },
  {
    key: 'patientClass',
    name: '患者端类别',
    enums: treatmentStatus
  },
  {
    key: 'doctorClass',
    name: '医生端类别',
    enums: treatmentStatus
  },
  {
    key: 'rank',
    name: '排序',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
