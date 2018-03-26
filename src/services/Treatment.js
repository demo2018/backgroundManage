import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

// 就诊列表接口
export function getDatas(param) {
  return post(`/bhyy/core/visit/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 获取擅长项目接口
export function getItems(param) {
  return get('/bhyy/core/itemClass', param);
}
// 删除就诊信息接口
export function doDelete(param) {
  return del(`/bhyy/core/appointment/${param}`);
}
// 获取评价接口
export function getComment(param) {
  return get('/bhyy/core/commentTag', param);
}
// 获取随访记录接口
export function getVisit(param) {
  return get(`/bhyy/core/${param}/visitRecord`);
}
// 获取管理员接口
export function getManager() {
  return get('/bhyy/core/sysUser', { enable: 0 });
}
// 新增随访记录接口
export function addVisit(param) {
  return post('/bhyy/core/visitRecord', param);
}
// 更新随访记录接口
export function editVisit(param) {
  return put(`/bhyy/core/visitRecord/${param.id}`, param.param);
}
// 删除随访记录接口
export function delVisit(param) {
  return del(`/bhyy/core/visitRecord/${param}`);
}
// 发送短信接口
export function sendMsg(param) {
  return post('/web/ent/sendMsg', param);
}
// 导出数据接口
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/bhyy/core/visit/search', params });
}
