import Model from 'utils/model';
import services from 'services';
import { getFields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  customerName: '', // 患者姓名
  phone: '', // 手机号
  itemClassId: '', // 项目ID
  doctorName: '', // 医生姓名
  customerOrg: '', // 单位名称
  hospitalName: '', // 诊所名称
  status: '', // 就诊状态
  startTime: '', // 开始时间
  endTime: '', // 结束时间
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
    getFields,
    search: initialSearch,
    datas: [],
    total: 0,
    types: [],
    selected: [],
    selecteRecord: {},
    assessModalVisible: false,
    visitModalVisible: false,
    visitInfo: {},
    visitList: [],
    managerList: [],
    itemList: [],
    tagList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/treatment/treatmentList', ({ query }) => {
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
      const { data: { content } } = yield callWithLoading(services.treatment.getItems, { type: 1, status: 1 });
      yield update({ itemList: content || [] });
    },
    // 获取列表数据
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ treatmentList }) => treatmentList);
      const { data: { content, totalElements } } = yield callWithLoading(services.treatment.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 删除就诊
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.treatment.doDelete, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDatas' });
    },
    // 评价
    * getComment({ param }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.treatment.getComment, { appointmentId: param });
      yield update({ tagList: content });
    },
    // 获取随访相关数据
    * getManager({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.treatment.getVisit, param);
      const { data: { content } } = yield callWithLoading(services.treatment.getManager);
      yield update({ visitList: data, managerList: content });
    },
    // 添加回访
    * addVisit({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.addVisit, { ...param }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, visitModalVisible: false });
    },
    // 更新回访
    * editVisit({ payload: { param, id } }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.editVisit, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, visitModalVisible: false });
    },
    // 删除回访
    * delVisit({ param }, { update, callWithLoading }) {
      yield callWithLoading(services.treatment.delVisit, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, visitModalVisible: false });
    },
    // 导出
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ treatmentList }) => treatmentList);
      yield callWithLoading(services.treatment.downFile, { selected: selected.join(',') });
    },
    // 发送信息提醒
    * sendMsg({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ treatmentList }) => treatmentList);
      yield callWithLoading(services.treatment.sendMsg, { selected: selected.join(',') });
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
