import { itemStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '折扣ID',
    sorter: true,
  },
  {
    key: 'limitPercentage',
    name: '折扣额度'
  },
  {
    key: 'createTime',
    name: '创建时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'status',
    name: '状态',
    enums: itemStatus,
    sorter: true,
  },
  {
    key: 'rank',
    name: '排序'
  },
  {
    key: 'option',
    name: '操作'
  }
];
