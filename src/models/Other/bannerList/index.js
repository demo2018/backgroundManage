import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '', // 名称
  status: '', // 状态
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'rank', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'bannerList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {},
    addModalVisible: false,
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/banner/list', ({ query }) => {
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
      const { search } = yield select(({ bannerList }) => bannerList);
      const { data: { content, totalElements } } = yield callWithLoading(services.banner.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 变更banner排序
    * rankChange({ payload: { id, param } }, { put, callWithLoading }) {
      yield callWithLoading(services.banner.rankChange, { id, param }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    },
    // 新增
    * doAdd({ payload: { param } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.banner.doAdd, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.banner.doEdit, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 删除
    * doDelete({ param }, { update, put, callWithLoading }) {
      yield callWithLoading(services.banner.doDelete, param, { successMsg: '操作成功' });
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
