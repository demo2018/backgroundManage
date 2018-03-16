import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '', // 诊所名称
  prov: '', // 诊所地址ID
  city: '', // 诊所地址ID
  leader: '', // 诊所负责人
  telephone: '', // 诊所电话
  date: '', // 时间
  isEnable: '', // 是否启用
  boheJoin: '', // 薄荷对接人
  startDate: '', // 开始时间
  endDate: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'id', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'clinicList',

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
      listen('/clinic/clinicList', ({ query }) => {
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
    // 获取列表信息
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ clinicList }) => clinicList);
      const { data: { content, totalElements } } = yield callWithLoading(services.clinic.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 删除诊所
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.clinic.doDelete, { ...param }, { successMsg: '操作成功' });
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
