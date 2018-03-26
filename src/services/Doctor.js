import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');

 // 获取医生列表接口
export function getDatas(param) {
  return post(`/bhyy/core/doctor/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
 // 新增医生接口
export function addDatas(param) {
  return post('/bhyy/core/doctor', param);
}
 // 获取医生详情接口
export function getInfo(param) {
  return get(`/bhyy/core/doctor/${param}`);
}
 // 更新医生详情接口
export function saveDatas(param) {
  return put(`/bhyy/core/doctor/${param.id}`, param.param);
}
 // 审核医生接口
export function toAudit(param) {
  return post(`/bhyy/core/check/${param.id}`, param.param);
}
 // 擅长标签接口
export function getAdept(param) {
  return get('/bhyy/core/commentTag', param);
}
 // 服务项目接口
export function getItems(param) {
  return get('/bhyy/core/itemClass', param);
}
 // 诊所接口
export function getHospital(param) {
  return post('/bhyy/core/hospital/search', param);
}
 // 诊所接口
export function toPlans(param) {
  return post(`/bhyy/core/${param.doctorId}/doctorConfig`, param);
}
export function sendMsg(param) {
  return post('/web/ent/sendMsg', param);
}
export function doDelete(param) {
  return post('/web/ent/doDelete', param);
}
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
export function downReport(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downReport', params });
}
