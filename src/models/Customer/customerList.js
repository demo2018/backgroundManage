import Model from 'utils/model';
import services from 'services';
import { customeFields as fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '', // 姓名
  phone: '', // 手机号码
  source: '', // 客户来源
  org: '', // 机构名称
  gender: '', // 性别
  age: '', // 年龄
  createStartTime: '', // 入驻开始时间
  createEndTime: '', // 入驻结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'id', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'customerList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    messageModalVisible: false,
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/customer/customerList', ({ query }) => {
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
    // 获取客户列表
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ customerList }) => customerList);
      const { data: { content, totalElements } } = yield callWithLoading(services.customer.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 删除客户信息
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.customer.doDelete, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    },
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ customerList }) => customerList);
      yield callWithLoading(services.customer.downFile, { selected: selected.join(',') });
    },
    * sendMsg({ payload: { param } }, { select, update, callWithLoading }) {
      const { selected } = yield select(({ customerList }) => customerList);
      yield callWithLoading(services.customer.sendMsg, { selected, ...param });
      yield update({ messageModalVisible: false });
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
