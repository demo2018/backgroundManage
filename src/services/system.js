import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');
// 管理员列表接口
export function getList(param) {
  return post('/bhyy/core/sysUser/search', param);
}
// 角色列表接口
export function getRoles(param) {
  return get('/bhyy/core/sysRole', param);
}
// 删除管理员接口
export function delMember(param) {
  return del(`/bhyy/core/sysUser/${param}`);
}
// 添加管理员接口
export function addMember(param) {
  return post('/bhyy/core/sysUser', param);
}
// 编辑管理员接口
export function editMember(param) {
  return put(`/bhyy/core/sysUser/${param.id}`, param.param);
}
// 角色详情接口
export function getInfo(param) {
  return get(`/bhyy/core/sysRole/${param}`);
}
// 菜单接口
export function menuList() {
  return get('/bhyy/core/sysMenu');
}
// 添加角色接口
export function doAdd(param) {
  return post('/bhyy/core/sysRole', param);
}
// 编辑角色接口
export function doEdit(param) {
  return put(`/bhyy/core/sysRole/${param.id}`, param.param);
}
// 删除角色接口
export function doDelete(param) {
  return del(`/bhyy/core/sysRole/${param}`);
}
// 获取设置接口
export function getSet() {
  return get('/bhyy/core/rewardsConfig');
}
// 修改设置接口
export function editAward(param) {
  return put('/bhyy/core/rewardsConfig', param);
}
