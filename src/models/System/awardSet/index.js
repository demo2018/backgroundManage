import Model from 'utils/model';
import services from 'services';
import { formatFormData } from 'utils/common';

export default Model.extend({
  namespace: 'awardSet',

  state: {
    details: {},
    types: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/award/set', () => {
        dispatch({ type: 'fetchDatas' });
      });
    }
  },

  effects: {
    // 获取列表数据
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ awardSet }) => awardSet);
      const { data: { content, totalElements } } = yield callWithLoading(services.system.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.system.doEdit, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    }
  },

  reducers: {

  }
});
