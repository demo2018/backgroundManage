import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');

export function getDatas(param) {
  return post(`/bhyy/core/bill/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
export function getItems(param) {
  return get('/bhyy/core/itemClass', param);
}
export function getBillinfo(param) {
  return get(`/bhyy/core/bill/${param}`);
}
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
