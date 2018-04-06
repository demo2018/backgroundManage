import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  id: '', // 初筛报告ID
  name: '', // 姓名
  phone: '', // 电话
  gender: '', // 性别
  isSend: '', // 是否发送
  orgName: '', // 机构名称
  startDate: '', // 开始时间
  endDate: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'time', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'reportList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {}
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/report/list', ({ query }) => {
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
      const { search } = yield select(({ reportList }) => reportList);
      const { data: { content, totalElements } } = yield callWithLoading(services.casehistory.getDatas, { ...formatFormData(search), caseType: 0 });
      yield update({ datas: content, total: totalElements });
    },
    // 删除
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.casehistory.doDelete, param, { successMsg: '操作成功' });
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
