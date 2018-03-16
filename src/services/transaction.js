import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');

export function getDatas(param) {
  return post('/bhyy/core/bill/search', param);
}
export function sendMsg(param) {
  return post('/web/ent/sendMsg', param);
}
export function doDelete(param) {
  return post('/web/ent/doDelete', param);
}
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
export function downReport(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downReport', params });
}
