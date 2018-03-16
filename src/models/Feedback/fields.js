import { feedbackStatus, sourceStatus } from 'configs/constants';

export const fields = [
  {
    key: 'content',
    name: '内容',
  },
  {
    key: 'name',
    name: '姓名'
  },
  {
    key: 'phone',
    name: '手机号'
  },
  {
    key: 'source',
    name: '来源',
    enums: sourceStatus,
    sorter: true,
  },
  {
    key: 'createTime',
    name: '时间',
    type: 'datetime',
    sorter: true,
  },
  {
    key: 'status',
    name: '状态',
    enums: feedbackStatus,
    sorter: true,
  },
  {
    key: 'option',
    name: '操作'
  }
];
