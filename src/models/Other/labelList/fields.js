import { itemStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '标签类型ID',
    sorter: true,
  },
  {
    key: 'name',
    name: '类型名称'
  },
  {
    key: 'rank',
    name: '排序',
    sorter: true,
  },
  {
    key: 'status',
    name: '状态',
    enums: itemStatus,
    sorter: true,
  },
  {
    key: 'createTime',
    name: '创建时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
