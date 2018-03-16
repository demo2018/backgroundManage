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
    clusterUuid: '',
  },

  subscriptions: {},

  effects: {
    *login({ payload }, { call, put }) {
      // const result = yield call(services.layout.login, { ...payload });
      yield put(routerRedux.push('/'));
      const expires = { expires: 1 };
      cookie.set('username', payload.username, expires);
      // cookie.set('st', result.token, expires);
    },
    *logout({ payload }, { put }) {
      cookie.remove('username');
      cookie.remove('userid');
      cookie.remove('sid');
      cookie.remove('st');
      yield put(routerRedux.push('/login'));
    },
    *updateNavState({ payload }) {
      if (payload.selectedKey) {
        cookie.set('selectedKey', payload.selectedKey);
      }
      if (payload.openKeys) {
        cookie.set('openKeys', payload.openKeys);
      }
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
