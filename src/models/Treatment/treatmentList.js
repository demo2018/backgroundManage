import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  customerName: '', // 患者姓名
  phone: '', // 手机号
  treatmentItem: '', // 项目ID
  doctorName: '', // 医生姓名
  orgName: '', // 单位名称
  hospitalName: '', // 诊所名称
  status: '', // 就诊状态
  startDate: '', // 开始时间
  endDate: '', // 结束时间
  age: '', // 年龄
  type: '', // 初复诊
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'time', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'treatmentList',

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
      listen('/treatment/treatmentList', ({ query }) => {
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
      const { search } = yield select(({ treatmentList }) => treatmentList);
      const { data: { content, totalElements } } = yield callWithLoading(services.treatment.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 发送信息提醒
    * sendMsg({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ treatmentList }) => treatmentList);
      yield callWithLoading(services.treatment.sendMsg, { selected: selected.join(',') });
    },
    // 评价
    * doAssess({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.doAssess, { ...param });
      yield update({ selecteRecord: {}, assessModalVisible: false });
    },
    // 回访
    * doVisit({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.doVisit, { ...param });
      yield update({ selecteRecord: {}, visitModalVisible: false });
    },
    // 删除
    * doDelete({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.treatment.doDelete, { ...param }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    },
    // 导出
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ treatmentList }) => treatmentList);
      yield callWithLoading(services.treatment.downFile, { selected: selected.join(',') });
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
