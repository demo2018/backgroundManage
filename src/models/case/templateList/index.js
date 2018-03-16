import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'templateList',

  state: {
    templateList: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/template/list': () => {
          dispatch({ type: 'resetState' });
        },
      });
    }
  },

  effects: {
    // 获取详情
    * fetchDetail({ payload }, { update, callWithLoading }) {
      const { datas, total } = yield callWithLoading(services.appointment.getDatas, {});
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
