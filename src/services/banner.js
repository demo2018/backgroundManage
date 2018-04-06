import http from 'utils/http';

const { post } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');
// 获取banner列表接口
export function getDatas(param) {
  return post(`/bhyy/core/banner/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 更新医生排序
export function rankChange(param) {
  return put(`/bhyy/core/banner/${param.id}`, { rank: param.param });
}
// 删除banner接口
export function doDelete(param) {
  return del(`/bhyy/core/banner/${param}`);
}
// 新增banner接口
export function doAdd(param) {
  return post('/bhyy/core/banner', param);
}
// 编辑banner接口
export function doEdit(param) {
  return put(`/bhyy/core/banner/${param.id}`, param.param);
}
