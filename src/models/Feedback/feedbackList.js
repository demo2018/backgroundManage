import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '',
  phone: '',
  date: '',
  status: '',
  source: '',
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'date', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'feedbackList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/feedback/list', ({ query }) => {
        const { notResetState } = query;
        if (notResetState !== 'true') {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'resetSearch' });
        }
        dispatch({ type: 'fetchDatas' });
      });
    }
  },

  effects: {
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ feedbackList }) => feedbackList);
      const { data: { content, totalElements } } = yield callWithLoading(services.feedback.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    * fetchTypes({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ feedbackList }) => feedbackList);
      const types = yield callWithLoading(services.feedback.getTypes, search);
      yield update({ types });
    },
    // 删除
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.feedback.doDelete, { ...param }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    },
  },

  reducers: {
    // 如果改变查询条件(非切换分页), 则将pn重置为1
    updateSearch(state, { payload: { search } }) {
      return {
        ...state,
        search: { ...state.search, pn: 1, ...search }
      };
    },
    resetSearch(state) {
      return {
        ...state,
        search: { ...initialSearch }
      };
    },
  }
});
