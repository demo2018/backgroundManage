import Model from 'utils/model';
import services from 'services';
import { fields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  name: '',
  phone: '',
  date: '',
  status: '',
  source: '',
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'date', // 排序字段
  ordination: 'DESC' // 排序方式
};

export default Model.extend({
  namespace: 'feedbackList',

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
      listen('/feedback/list', ({ query }) => {
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
      const { search } = yield select(({ feedbackList }) => feedbackList);
      const { data: { content, totalElements } } = yield callWithLoading(services.feedback.getDatas, formatFormData(search));
      yield update({ datas: content, total: totalElements });
    },
    // 获取随访相关数据
    * getManager({ param }, { update, callWithLoading }) {
      const { data } = yield callWithLoading(services.feedback.getFollow, param);
      const { data: { content } } = yield callWithLoading(services.feedback.getManager);
      yield update({ followList: data, managerList: content });
    },
    // 添加回访
    * addFollow({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.feedback.addFollow, { ...param }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, followModalVisible: false });
    },
    // // 更新回访
    // * editFollow({ payload: { param, id } }, { update, callWithLoading }) {
    //   yield callWithLoading(services.feedback.editFollow, { param, id }, { successMsg: '操作成功' });
    //   yield update({ selecteRecord: {}, followModalVisible: false });
    // },
    // 删除回访
    * delFollow({ param }, { update, callWithLoading }) {
      yield callWithLoading(services.feedback.delFollow, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, followModalVisible: false });
    },
    // 删除
    * doDelete({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.feedback.doDelete, param, { successMsg: '操作成功' });
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
