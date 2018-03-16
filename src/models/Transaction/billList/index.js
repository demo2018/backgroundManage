import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  billID: '', // 账单号
  patientName: '', // 患者姓名
  phone: '', // 手机号
  doctorName: '', // 医生姓名
  hospitalName: '', // 诊所名称
  itemName: '', // 项目名称
  status: '', // 状态名称
  payType: '', // 支付方式
  isOnSale: '', // 优惠情况
  startDate: '', // 开始时间
  endDate: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'status', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'billList',

  state: {
    fields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {},
    assessModalVisible: false,
    visitModalVisible: false,
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/bill/list', ({ query }) => {
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
      const { search } = yield select(({ billList }) => billList);
      const { data: { content, totalElements } } = yield callWithLoading(services.transaction.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 新增
    * doAdd({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.transaction.doVisit, { ...param });
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
    // 编辑
    * doEdit({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.transaction.doVisit, { ...param });
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
    // 删除
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.transaction.doDelete, { ...param }, { successMsg: '操作成功' });
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
