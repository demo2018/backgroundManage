import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorAudits',

  state: {
    id: '',
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/audits/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorAudits }) => doctorAudits);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
    },
    // 审核医生状态
    * toAudit({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.toAudit, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetails' });
    },
  }
});
