import http from 'utils/http';

const sso = http.create('sso');
const permission = http.create('permission');

export function login(param) {
  return sso.post('/common/web/login.do', param);
}

// 获取菜单权限
export function getMenus(param) {
  return permission.post('/permission/web/get-user-menus', param);
}

