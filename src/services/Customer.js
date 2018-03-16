import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

// 客户列表接口
export function getDatas(param) {
  return get('/bhyy/core/customer', param);
}
// 客户详情接口
export function getInfo(param) {
  return get(`/bhyy/core/customer/${param.id}`);
}
// 客户关系列表接口
export function getList(param) {
  return get('/bhyy/core/customerRelation', param);
}
// 新增客户接口
export function addDatas(param) {
  return post('/bhyy/core/customer', param);
}
// 更新客户接口
export function upDatas(param) {
  return put(`/bhyy/core/customer/${param.id}`, param);
}
// 新增关系客户接口
export function addRelation(param) {
  return post(`/bhyy/core/${param.id}/customerRelation`, param.param);
}
// 更新关系客户接口
export function upRelation(param) {
  return put(`/bhyy/core/${param.id}/customerRelation/${param.relationId}`, param.param);
}
// 删除客户接口
export function doDelete(param) {
  return del(`/bhyy/core/customer/${param}`);
}
// 删除关系客户接口
export function deleteRelation(param) {
  return del(`/bhyy/core/customerRelation/${param}`);
}
export function sendMsg(param) {
  return post('/web/ent/sendMsg', param);
}
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
