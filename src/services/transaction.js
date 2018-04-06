import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');

// 账单列表接口
export function getDatas(param) {
  return post(`/bhyy/core/bill/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 项目列表接口
export function getItems(param) {
  return get('/bhyy/core/itemClass', param);
}
// 账单详情接口
export function getBillinfo(param) {
  return get(`/bhyy/core/bill/${param}`);
}
// 导出数据接口
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
