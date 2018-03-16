import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'feedbackDetail',

  state: {
    feedbackId: '',
    feedbackDetail: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/feedback/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/feedback/detail/:id': ({ params }) => {
          const feedbackId = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { feedbackId } });
        },
      });
    }
  },

  effects: {
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ feedbackDetail }) => feedbackDetail);
      const { datas, total } = yield callWithLoading(services.feedback.getDatas, search);
      yield update({ datas, total });
    },
  },

  reducers: {
  }
});
