import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorAudits',

  state: {
    id: '',
    details: {},
    adeptList: [],
    itemLists: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/audits/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchAdept' });
          dispatch({ type: 'fetchItem' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取擅长项目
    * fetchAdept({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getAdept, { typeId: 3 });
      yield update({ adeptList: content || [] });
    },
    // 获取服务项目
    * fetchItem({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getItems, { type: 1, status: 1 });
      yield update({ itemLists: content || [] });
    },
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorAudits }) => doctorAudits);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
    },
    // 审核医生状态
    * toAudit({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.toAudit, { param, id }, { successMsg: '操作成功' });
      // yield put({ type: 'fetchDetails' });
      yield put(routerRedux.push('/doctor/doctorList'));
    },
  }
});
