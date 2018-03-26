import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorPlans',

  state: {
    id: '',
    details: {},
    hospitalList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/plans/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getHospital' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取诊所
    * getHospital({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getHospital, { isEnable: 1 });
      yield update({ hospitalList: content || [] });
    },
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorPlans }) => doctorPlans);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
    },
    // 更新医生详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.saveDatas, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 新增医生详情
    * toPlans({ param }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctor.toPlans, param, { successMsg: '操作成功' });
      // yield put(routerRedux.push(`/doctor/detail/${data}`));
    },
  }
});
