import Model from 'utils/model';
import cookie from 'js-cookie';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'layout',

  state: {
    siteName: '医疗管理后台',
    siderFold: false,
    isNavbar: document.body.clientWidth < 769,
    clusters: [],
    menus: [],
    clusterUuid: '',
  },

  subscriptions: {
    setupSubscriber({ dispatch }) {
      dispatch({ type: 'getMenulist' });
    }
  },

  effects: {
    *login({ payload }, { call, put }) {
      const result = yield call(services.layout.login, { ...payload });
      if (result.status) {
        const expires = { expires: 1 };
        cookie.set('username', result.data.username, expires);
        cookie.set('userid', result.data.id, expires);
        cookie.set('seesionid', result.data.sessionId, expires);
        yield put(routerRedux.push('/'));
      }
    },
    *logout({ payload }, { call, put }) {
      const result = yield call(services.layout.logout);
      if (result.status) {
        cookie.remove('username');
        cookie.remove('userid');
        cookie.remove('seesionid');
        yield put(routerRedux.push('/login'));
      }
    },
    *updateNavState({ payload }) {
      if (payload.selectedKey) {
        cookie.set('selectedKey', payload.selectedKey);
      }
      if (payload.openKeys) {
        cookie.set('openKeys', payload.openKeys);
      }
    },
    *getMenulist({ payload }, { call, update }) {
      // const result = yield call(services.layout.login, { ...payload });
      const { data } = yield call(services.layout.getMenus);
      let list = [];
      for (let i = 0; i < data.length; i++) {
        list[i] = { key: data[i].key, title: data[i].name, path: data[i].url, icon: data[i].icon };
        if (data[i].children && data[i].children[0]) {
          let childrenlist = [];
          for (let j = 0; j < data[i].children.length; j++) {
            childrenlist[j] = { key: data[i].children[j].key, title: data[i].children[j].name, path: data[i].children[j].url };
          }
          list[i] = { key: data[i].key, title: data[i].name, path: data[i].url, icon: data[i].icon, children: childrenlist };
        }
      }
      yield update({ menus: list });
    },
  },

  reducers: {
    updateUser(state, { payload: { user } }) {
      return {
        ...state,
        user: Object.assign({}, state.user, user)
      };
    },
    switchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold
      };
    }
  }
});
