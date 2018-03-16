import { itemStatus } from 'configs/constants';

export const fields = [
  {
    key: 'id',
    name: 'bannerID',
    sorter: true,
  },
  {
    key: 'name',
    name: 'banner名称'
  },
  {
    key: 'image',
    name: '图片'
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
