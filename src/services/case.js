import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { del } = http.create('disease');
// 病历列表接口
export function getDatas(param) {
  return post(`/bhyy/core/caseReport/search?page=${param.page}&size=${param.size}&sort=${param.sort}`, param);
}
// 查询项目列表
export function getProjectList() {
  return get('/bhyy/core/itemClass', { type: 1 });
}
// 删除病历接口
export function doDelete(param) {
  return del(`/bhyy/core/caseReport/${param}`);
}
