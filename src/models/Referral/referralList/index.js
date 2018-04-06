import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { formatFormData } from 'utils/common';
import { PAGE_SIZE } from 'configs/constants';

const initialSearch = {
  customerName: '', // 患者姓名
  phone: '', // 患者电话
  doctorName: '', // 医生姓名
  status: '', // 状态
  type: '', // 奖励类型
  number: '', // 奖励金额范围
  startDate: '', // 开始时间
  endDate: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'id', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'referralList',

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
      listen('/referral/referralList', ({ query }) => {
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
    // 获取转诊列表
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ referralList }) => referralList);
      const { data: { content, totalElements } } = yield callWithLoading(services.referral.getDatas, formatFormData({ ...search, sortField: 'r.' + search.sortField }));
      yield update({ datas: content, total: totalElements });
    },
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ referralList }) => referralList);
      yield callWithLoading(services.referral.downFile, { selected: selected.join(',') });
    },
    // 发送转诊报告
    * downReport({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ referralList }) => referralList);
      yield callWithLoading(services.referral.downReport, selected, { successMsg: '操作成功' });
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
