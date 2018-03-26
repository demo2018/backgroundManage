import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');

// 诊所列表接口
export function getDatas(param) {
  return post(`/bhyy/core/hospital/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 诊所详情接口
export function getInfo(param) {
  return get(`/bhyy/core/hospital/${param.id}`);
}
// 更新诊所详情接口
export function saveDatas(param) {
  return put(`/bhyy/core/hospital/${param.id}`, param.param);
}
// 新增诊所接口
export function addDatas(param) {
  return post('/bhyy/core/hospital', param);
}
// 删除诊所接口
export function doDelete(param) {
  return post('/web/ent/doDelete', param);
}
