import http from 'utils/http';

// const sso = http.create('sso');
// const permission = http.create('permission');
const { post } = http.create('disease');
const { get } = http.create('disease');

export function login(param) {
  return post('/bhyy/sysUser/login', param);
}
export function logout() {
  return get('/bhyy/user/logout');
}
// // 获取菜单权限
// export function getMenus(param) {
//   return permission.post('/permission/web/get-user-menus', param);
// }

