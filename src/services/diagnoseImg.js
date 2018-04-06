import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');
// 影像列表接口
export function getDatas(param) {
  return post(`/bhyy/core/caseImage/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 删除影像接口
export function doDelete(param) {
  return del(`/bhyy/core/caseImage/${param}`);
}
// 查询就诊信息接口
export function getAppointList(param) {
  return post('/bhyy/core/appointment/search', param);
}
// 查询影像详情接口
export function getInfo(param) {
  return get(`/bhyy/core/caseImage/${param}`);
}
// 新增影像详情接口
export function addData(param) {
  return post('/bhyy/core/caseImage', param);
}
// 编辑影像详情接口
export function editData(param) {
  return put(`/bhyy/core/caseImage/${param.id}`, param.param);
}
