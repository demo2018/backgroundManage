import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'clinicDetail',

  state: {
    id: '',
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/clinic/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/clinic/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取诊所详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ clinicDetail }) => clinicDetail);
      const { data } = yield callWithLoading(services.clinic.getInfo, { id });
      yield update({ details: data });
    },
    // 更新诊所详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.clinic.saveDatas, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 新增诊所详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.clinic.addDatas, param, { successMsg: '操作成功' });
      yield put(routerRedux.push(`/clinic/detail/${data}`));
    },
  },

  reducers: {
  }
});
