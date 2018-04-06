import { genderType } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '影像ID',
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
    name: '手机号'
  },
  {
    key: 'filmTime',
    name: '拍摄时间',
    type: 'datetime',
    sorter: true
  },
  {
    key: 'option',
    name: '操作'
  }
];
