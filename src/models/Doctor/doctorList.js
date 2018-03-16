import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  realName: '', // 姓名
  phone: '', // 手机号
  recommendName: '', // 推荐人姓名
  id: '', // 医生ID
  source: '', // 来源
  hospitalName: '', // 执业医院
  adept: '', // 擅长项目
  status: '', // 状态
  createStartTime: '', // 入驻开始时间
  createEndTime: '', // 入驻结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'rank', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'doctorList',

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
      listen('/doctor/doctorList', ({ query }) => {
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
      const { search } = yield select(({ doctorList }) => doctorList);
      const { data: { content, totalElements } } = yield callWithLoading(services.doctor.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    * sendMsg({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ doctorList }) => doctorList);
      yield callWithLoading(services.doctor.sendMsg, { selected: selected.join(',') }, { successMsg: '操作成功' });
    },
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ doctorList }) => doctorList);
      yield callWithLoading(services.doctor.downFile, { selected: selected.join(',') });
    },
    * downReport({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ doctorList }) => doctorList);
      yield callWithLoading(services.doctor.downReport, { selected: selected.join(',') });
    },
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.doDelete, { ...param }, { successMsg: '操作成功' });
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
