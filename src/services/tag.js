import http from 'utils/http';

const { post } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');
// 获取子标签列表接口
export function getDatas(param) {
  return post(`/bhyy/core/commentTag/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 更新医生排序
export function rankChange(param) {
  return put(`/bhyy/core/commentTag/${param.id}`, { rank: param.param });
}
// 删除子标签接口
export function doDelete(param) {
  return del(`/bhyy/core/commentTag/${param}`);
}
// 添加子标签接口
export function doAdd(param) {
  return post('/bhyy/core/commentTag', param);
}
// 编辑子标签接口
export function doEdit(param) {
  return put(`/bhyy/core/commentTag/${param.id}`, param.param);
}
