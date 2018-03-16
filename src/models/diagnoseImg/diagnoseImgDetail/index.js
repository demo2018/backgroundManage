import Model from 'utils/model';
import services from 'services';

export default Model.extend({
  namespace: 'diagnoseImgDetail',

  state: {
    diagnoseId: '',
    diagnoseImgDetail: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/diagnoseImg/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/diagnoseImg/detail/:id': ({ params }) => {
          const diagnoseId = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { diagnoseId } });
        },
      });
    }
  },

  effects: {
    // 获取详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ diagnoseImgDetail }) => diagnoseImgDetail);
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
