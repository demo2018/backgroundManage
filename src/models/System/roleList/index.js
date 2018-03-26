import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'id', // 排序字段
  ordination: 'ASC' // 排序方式
};

export default Model.extend({
  namespace: 'roleList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    selected: [],
    selecteRecord: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/role/list', ({ query }) => {
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
    // 获取列表数据
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ roleList }) => roleList);
      const { data: { content, totalElements } } = yield callWithLoading(services.system.getRoles, formatFormData(search));
      yield update({ datas: content, total: totalElements });
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
    // 删除
    * doDelete({ param }, { update, put, callWithLoading }) {
      yield callWithLoading(services.system.doDelete, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
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
