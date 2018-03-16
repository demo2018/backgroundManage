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
  sortField: 'clinicTime', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'reportList',

  state: {
    fields,
    search: initialSearch,
    datas: [{
      'treatmentId': 11685,
      'name': '张三',
      'phone': '13812345678',
      'treatmentItem': '洗牙',
      'type': '0',
      'doctorName': '王医生',
      'treatmentStatus': '0',
      'clinicTime': '2018-01-11'
    }, {
      'treatmentId': 9849,
      'name': '王五',
      'phone': '13887654321',
      'treatmentItem': '洗牙',
      'type': '0',
      'doctorName': '赵医生',
      'treatmentStatus': '1',
      'clinicTime': '2018-01-14'
    }, {
      'treatmentId': 5649,
      'name': '超四',
      'phone': '13866666666',
      'treatmentItem': '洗牙',
      'type': '1',
      'doctorName': '李医生',
      'treatmentStatus': '2',
      'clinicTime': '2018-02-11'
    }],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {},
    assessModalVisible: false,
    visitModalVisible: false,
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
