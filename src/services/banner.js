import http from 'utils/http';

const { post } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

export function getDatas(param) {
  return post('/bhyy/core/banner/search', param);
}
export function doDelete(param) {
  return del(`/bhyy/core/banner/${param}`);
}
export function doAdd(param) {
  return post('/bhyy/core/banner', param);
}
export function doEdit(param) {
  return put(`/bhyy/core/banner/${param.id}`, param.param);
}
