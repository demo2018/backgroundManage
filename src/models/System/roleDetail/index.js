import Model from 'utils/model';
import services from 'services';
import { formatFormData } from 'utils/common';

export default Model.extend({
  namespace: 'roleDetail',

  state: {
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/role/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/role/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取列表数据
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ roleDetail }) => roleDetail);
      const { data } = yield callWithLoading(services.system.getRoles, formatFormData(search));
      yield update({ details: data });
    },
    // 新增
    * doAdd({ payload: { param } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.doAdd, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.doEdit, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
  },

  reducers: {

  }
});
