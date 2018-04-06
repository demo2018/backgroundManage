import http from 'utils/http';
import { downFile as downFileFn } from 'utils/common';

const { post } = http.create('disease');
const { get } = http.create('disease');
// 转诊列表接口
export function getDatas(param) {
  return post(`/bhyy/core/referral/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 转诊详情接口
export function getRebate(param) {
  return get(`/bhyy/core/referral/detail/${param}`);
}
// 发送转诊报告接口
export function downReport(param) {
  return post('/bhyy/core/referral/send', param);
}
export function downFile(params) {
  downFileFn({ server: 'disease', url: '/web/sale-performance/ent/downFile', params });
}
