import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

export function getDatas(param) {
  return get(`/bhyy/core/commentTagType/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
export function getList(param) {
  return get('/bhyy/core/sysUser', param);
}
export function getRoles(param) {
  return get('/bhyy/core/sysRole', param);
}
export function delMember(param) {
  return del(`/bhyy/core/sysUser/${param}`);
}
export function addMember(param) {
  return post('/bhyy/core/sysUser', param);
}
export function editMember(param) {
  return put(`/bhyy/core/sysUser/${param.id}`, param.param);
}
export function doDelete(param) {
  return del(`/bhyy/core/commentTagType/${param}`);
}
export function doAdd(param) {
  return post('/bhyy/core/commentTagType', param);
}
export function doEdit(param) {
  return put(`/bhyy/core/commentTagType/${param.id}`, param.param);
}
