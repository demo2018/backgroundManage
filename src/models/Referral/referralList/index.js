import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';

const initialSearch = {
  realName: '',
  phone: '',
  recommendName: '',
  doctorId: '',
  source: null,
  hospitalName: '',
  adept: '',
  status: null,
  addDate: '',
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'referralId', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'referralList',

  state: {
    fields,
    search: initialSearch,
    datas: [{
      'doctorId': 11685,
      'realName': '詹医生',
      'phone': '13812345678',
      'hospitalName': '牙科医院',
      'source': '0',
      'status': '2',
      'rank': '5',
      'addDate': '2018-01-11',
      'is_show': '1'
    }, {
      'doctorId': 9849,
      'realName': '宋医生',
      'phone': '13887654321',
      'hospitalName': '牙科医院',
      'source': '0',
      'status': '0',
      'rank': '5',
      'addDate': '2018-01-14',
      'is_show': '0'
    }, {
      'doctorId': 5649,
      'realName': '赵医生',
      'phone': '13866666666',
      'hospitalName': '牙科医院',
      'source': '1',
      'status': '3',
      'rank': '5',
      'addDate': '2018-02-11',
      'is_show': '1'
    }],
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
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ referralList }) => referralList);
      const { datas, total } = yield callWithLoading(services.referral.getDatas, search);
      yield update({ datas, total });
    },
    * sendMsg({ payload }, { select, update, callWithLoading }) {
      const { selected } = yield select(({ referralList }) => referralList);
      yield callWithLoading(services.referral.sendMsg, { selected: selected.join(',') }, { successMsg: '操作成功' });
    },
    * downFile({ payload }, { select, update, callWithLoading }) {
      const { selected } = yield select(({ referralList }) => referralList);
      yield callWithLoading(services.referral.downFile, { selected: selected.join(',') });
    },
    * downReport({ payload }, { select, update, callWithLoading }) {
      const { selected } = yield select(({ referralList }) => referralList);
      yield callWithLoading(services.referral.downReport, { selected: selected.join(',') });
    },
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.referral.doDelete, { ...param }, { successMsg: '操作成功' });
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
