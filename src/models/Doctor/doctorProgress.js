import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'doctorProgress',

  state: {
    id: '',
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/progress/:id': ({ params }) => {
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
      const { id } = yield select(({ doctorDetail }) => doctorDetail);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
    },
  }
});
