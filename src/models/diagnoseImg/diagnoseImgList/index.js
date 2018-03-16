import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';

const initialSearch = {
  name: '',
  phone: '',
  treatmentItem: '',
  doctorName: '',
  orgName: '',
  hospitalName: '',
  treatmentStatus: '',
  clinicTime: '',
  age: '',
  type: '',
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'status', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'diagnoseImgList',

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
      listen('/diagnoseImg/list', ({ query }) => {
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
      const { search } = yield select(({ diagnoseImgList }) => diagnoseImgList);
      const { datas, total } = yield callWithLoading(services.doctor.getDatas, search);
      yield update({ datas, total });
    },
    // 删除
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.treatment.doDelete, { ...param }, { successMsg: '操作成功' });
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
