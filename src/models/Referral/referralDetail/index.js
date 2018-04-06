import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'referralDetail',

  state: {
    id: '',
    details: {}
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/referral/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取项目详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ referralDetail }) => referralDetail);
      const { data } = yield callWithLoading(services.referral.getRebate, id);
      yield update({ details: data });
    }
  },

  reducers: {

  }
});
