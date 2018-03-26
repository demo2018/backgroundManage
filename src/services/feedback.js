import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
// const { put } = http.create('disease');
const { del } = http.create('disease');

export function getDatas(param) {
  return post(`/bhyy/core/opinion/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 获取随访记录接口
export function getFollow(param) {
  return get(`/bhyy/core/opinionRecord?opinionId=${param}`);
}
// 获取管理员接口
export function getManager() {
  return get('/bhyy/core/sysUser', { enable: 0 });
}
// 新增随访记录接口
export function addFollow(param) {
  return post('/bhyy/core/opinionRecord', param);
}
// // 更新随访记录接口
// export function editFollow(param) {
//   return put(`/bhyy/core/visitRecord/${param.id}`, param.param);
// }
// 删除随访记录接口
export function delFollow(param) {
  return del(`/bhyy/core/opinionRecord/${param}`);
}
export function doDelete(param) {
  return del(`/bhyy/core/opinion/${param}`);
}
