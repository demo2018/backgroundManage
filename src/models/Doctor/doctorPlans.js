import Model from 'utils/model';
import services from 'services';
import { PAGE_SIZE } from 'configs/constants';
import { datefields as fields } from './fields';
import { formatFormData } from 'utils/common';

const initialSearch = {
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'date', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'doctorPlans',

  state: {
    fields,
    id: '',
    search: initialSearch,
    details: {},
    total: 0,
    selected: [],
    hospitalList: [],
    datelists: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/plans/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getHospital' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取诊所
    * getHospital({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getHospital, { isEnable: 1 });
      yield update({ hospitalList: content || [] });
    },
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorPlans }) => doctorPlans);
      const { search } = yield select(({ doctorPlans }) => doctorPlans);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      const { data: { content } } = yield callWithLoading(services.doctor.getDatelists, { ...formatFormData(search), doctorId: id });
      yield update({ details: data, datelists: content });
    },
    // 安排出诊时间
    * toPlans({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.toPlans, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 删除出诊时间
    * onDeletes({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.delPlans, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
  },

  reducers: {
    // 如果改变查询条件(非切换分页), 则将pn重置为1
    updateSearch(state, { payload: { search } }) {
      return {
        ...state,
        search: { ...state.search, pn: 1, ...search }
      };
    }
  }
});
