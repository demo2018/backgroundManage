import Model from 'utils/model';
import services from 'services';
import { getFields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  appointId: '', // 预约单号
  customerName: '', // 姓名
  itemClassId: '', // 预约项目ID
  doctorName: '', // 医生名字
  customerOrg: '', // 机构名称
  hospitalName: '', // 医院名称
  status: '', // 预约状态
  time: '', // 预约就诊时间
  phone: '', // 手机号
  source: '', // 来源
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'appointId', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'appointmentList',

  state: {
    getFields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    itemList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/appointment/appointmentList', ({ query }) => {
        const { notResetState } = query;
        if (notResetState !== 'true') {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'resetSearch' });
        }
        dispatch({ type: 'fetchEnums' });
        dispatch({ type: 'fetchDatas' });
      });
    }
  },

  effects: {
    // 获取枚举值
    * fetchEnums({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.transaction.getItems, { type: 1, status: 1 });
      yield update({ itemList: content || [] });
    },
    // 获取列表信息
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ appointmentList }) => appointmentList);
      const { data: { content, totalElements } } = yield callWithLoading(services.appointment.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 删除
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.appointment.doDelete, param, { successMsg: '操作成功' });
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
