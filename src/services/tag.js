import http from 'utils/http';

const { post } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

export function getDatas(param) {
  return post(`/bhyy/core/commentTag/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
export function doDelete(param) {
  return del(`/bhyy/core/commentTag/${param}`);
}
export function doAdd(param) {
  return post('/bhyy/core/commentTag', param);
}
export function doEdit(param) {
  return put(`/bhyy/core/commentTag/${param.id}`, param.param);
}
