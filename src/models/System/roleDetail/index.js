import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'roleDetail',

  state: {
    details: {},
    menuList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/role/add': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getMenu' });
        },
        '/role/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getMenu' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取角色数据
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ roleDetail }) => roleDetail);
      const { data } = yield callWithLoading(services.system.getInfo, id);
      yield update({ details: data });
    },
    // 获取菜单列表
    * getMenu({ param }, { update, callWithLoading }) {
      const res = yield callWithLoading(services.system.menuList);
      const list = [];
      for (let i = 0; i < res.data.length; i++) {
        list[i] = { key: res.data[i].id, title: res.data[i].name };
        if (res.data[i].children && res.data[i].children[0]) {
          const childrenlist = [];
          for (let j = 0; j < res.data[i].children.length; j++) {
            childrenlist[j] = { key: res.data[i].children[j].id, title: res.data[i].children[j].name };
          }
          list[i] = { key: res.data[i].id, title: res.data[i].name, children: childrenlist };
        }
      }
      yield update({ menuList: list });
    },
    // 新增
    * addDatas({ payload: { param } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.doAdd, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      // yield put({ type: 'fetchDatas' });
      yield put(routerRedux.push('/role/list'));
    },
    // 编辑
    * updateDatas({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.doEdit, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      // yield put({ type: 'fetchDatas' });
      yield put(routerRedux.push('/role/list'));
    },
  },

  reducers: {

  }
});
