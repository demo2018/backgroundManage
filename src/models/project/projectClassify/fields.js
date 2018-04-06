import { itemStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: '分类ID',
    sorter: true,
  },
  {
    key: 'className',
    name: '分类名称'
  },
  {
    key: 'createTime',
    name: '创建时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'childCount',
    name: '关联项目数'
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
