import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');

export function getDatas(param) {
  return post('/bhyy/core/visit/search', param);
}

export function getTypes(param) {
  return post('/web/ent/getTypes', param);
}

export function sendMsg(param) {
  return post('/web/ent/sendMsg', param);
}

export function doAssess(param) {
  return post('/web/ent/doAssess', param);
}

export function doVisit(param) {
  return post('/web/ent/doVisit', param);
}

export function doDelete(param) {
  return post('/web/ent/doDelete', param);
}

export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
