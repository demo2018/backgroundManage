import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorDetail',

  state: {
    id: '',
    details: {},
    adeptList: [],
    itemoptions: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/add': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getAdept' });
          dispatch({ type: 'fetchEnums' });
        },
        '/doctor/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getAdept' });
          dispatch({ type: 'fetchEnums' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取医生详情
    * getAdept({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getAdept, { typeId: 3 });
      yield update({ adeptList: content || [] });
    },
    // 获取枚举值
    * fetchEnums({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getItems, { type: 1, status: 1 });
      yield update({ itemoptions: content || [] });
    },
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorDetail }) => doctorDetail);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
    },
    // 更新医生详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.saveDatas, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 新增医生详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctor.addDatas, param, { successMsg: '操作成功' });
      yield put(routerRedux.push(`/doctor/detail/${data}`));
    },
  }
});
