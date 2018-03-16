import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'reportDetail',

  state: {
    reportId: '',
    reportDetail: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/report/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/report/detail/:id': ({ params }) => {
          const reportId = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { reportId } });
        },
      });
    }
  },

  effects: {
    // 获取详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ reportDetail }) => reportDetail);
      const { datas, total } = yield callWithLoading(services.appointment.getDatas, search);
      yield update({ datas, total });
    },
    // 新增
    * doAdd({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.doVisit, { ...param });
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
    // 编辑
    * doEdit({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.doVisit, { ...param });
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
  },

  reducers: {
  }
});
