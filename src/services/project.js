import http from 'utils/http';

const { post } = http.create('disease');
const { get } = http.create('disease');
const { put } = http.create('disease');
const { del } = http.create('disease');

// 项目分类列表接口
export function itemDatas(param) {
  return get(`/bhyy/core/itemClass/type?type=${param.tabKey}`, param.search);
}
// 更新项目分类排序
export function rankChangeClass(param) {
  return put(`/bhyy/core/itemClass/${param.id}`, { rank: param.param });
}
// 更新折扣排序
export function rankChangeDiscount(param) {
  return put(`/bhyy/core/discount/${param.id}`, { rank: param.param });
}
// 更新项目排序
export function rankItem(param) {
  return put(`/bhyy/core/item/${param.id}`, { rank: param.param });
}
// 项目分类列表接口
export function getClass(param) {
  return get('/bhyy/core/itemClass', param);
}
// 新增项目分类接口
export function doAdd(param) {
  return post('/bhyy/core/itemClass', param);
}
// 编辑项目分类接口
export function doEdit(param) {
  return put(`/bhyy/core/itemClass/${param.id}`, param.param);
}
// 删除项目分类接口
export function doDelete(param) {
  return del(`/bhyy/core/itemClass/${param}`);
}
// 折扣列表接口
export function discountDatas(param) {
  return get('/bhyy/core/discount', param);
}
// 新增折扣接口
export function addDiscount(param) {
  return post('/bhyy/core/discount', param);
}
// 编辑折扣接口
export function editDiscount(param) {
  return put(`/bhyy/core/discount/${param.id}`, param.param);
}
// 删除折扣接口
export function deleteDiscount(param) {
  return del(`/bhyy/core/discount/${param}`);
}
// 项目列表接口
export function itemLists(param) {
  return get('/bhyy/core/item', param);
}
// 新增项目接口
export function addItem(param) {
  return post('/bhyy/core/item', param);
}
// 编辑项目接口
export function editItem(param) {
  return put(`/bhyy/core/item/${param.id}`, param.param);
}
// 删除项目接口
export function deleteItem(param) {
  return del(`/bhyy/core/item/${param}`);
}
// 项目详情接口
export function getInfo(param) {
  return get(`/bhyy/core/item/${param}`);
}
