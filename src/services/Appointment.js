import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

// 预约列表接口
export function getDatas(param) {
  return post(`/bhyy/core/appointment/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 预约详情接口
export function getInfo(param) {
  return get(`/bhyy/core/appointment/${param.id}`);
}
// 编辑预约详情接口
export function editInfo(param) {
  return put(`/bhyy/core/appointment/${param.id}`, param.param);
}
// 新增预约详情接口
export function addInfo(param) {
  return post('/bhyy/core/backend/appointment', param);
}
// 删除预约详情接口
export function doDelete(param) {
  return del(`/bhyy/core/appointment/${param}`);
}
// 查询项目列表
export function getProjectList() {
  return get('/bhyy/core/itemClass', { page: 0, size: 1000, type: 1 });
}
// 查询病人列表
export function getPatientList(param) {
  return get('/bhyy/core/customer/name', param);
}
// 查询医生列表
export function getDoctorList(param) {
  return post('/bhyy/core/doctor/search', { ...param });
}
// 查询全部医生列表
export function getAllDoctorList() {
  return get('/bhyy/core/doctor', { page: 0, size: 1000, type: 1 });
}
// 查询医生日期
export function getDoctorDates(param) {
  return get('/bhyy/core/doctorConfig', param);
}
// 查询医生时间
export function getDoctorTimes({ id, date }) {
  return get(`/bhyy/core/${id}/doctorConfig`, { date });
}
