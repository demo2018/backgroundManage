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
