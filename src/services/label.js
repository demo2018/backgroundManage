import http from 'utils/http';

const { post } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');
// 获取标签列表接口
export function getDatas(param) {
  return post(`/bhyy/core/commentTagType/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 更新医生排序
export function rankChange(param) {
  return put(`/bhyy/core/commentTagType/${param.id}`, { rank: param.param });
}
// 删除标签接口
export function doDelete(param) {
  return del(`/bhyy/core/commentTagType/${param}`);
}
// 添加标签接口
export function doAdd(param) {
  return post('/bhyy/core/commentTagType', param);
}
// 编辑标签接口
export function doEdit(param) {
  return put(`/bhyy/core/commentTagType/${param.id}`, param.param);
}
