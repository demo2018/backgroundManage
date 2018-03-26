import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '', // 项目名称
  status: '', // 状态
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'rank', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'projectClassify',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {},
    addModalVisible: false,
    tabKey: '0',
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/project/classify', ({ query }) => {
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
      const { search, tabKey } = yield select(({ projectClassify }) => projectClassify);
      const { data: { content, totalElements } } = yield callWithLoading(services.project.itemDatas, { search: formatFormData(search), tabKey });
      yield update({ datas: content, total: totalElements });
    },
    // 新增
    * doAdd({ param }, { put, update, callWithLoading }) {
      yield callWithLoading(services.project.doAdd, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.project.doEdit, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 删除
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.project.doDelete, param, { successMsg: '操作成功' });
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
    tabChange(state, { payload: { tabKey } }) {
      return {
        ...state,
        tabKey,
        search: { ...initialSearch }
      };
    },
  }
});
