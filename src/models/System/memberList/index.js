import Model from 'utils/model';
import services from 'services';
import { getFields } from './fields';
import { PAGE_SIZE } from 'configs/constants';
import { formatFormData } from 'utils/common';

const initialSearch = {
  realName: '', // 管理员名字
  phone: '', // 管理员手机号
  roleId: '', // 管理ID
  startTime: '', // 开始时间
  endTime: '', // 结束时间
  pn: 1,
  ps: PAGE_SIZE,
  sortField: 'id', // 排序字段
  ordination: 'ASC' // 排序方式
};

export default Model.extend({
  namespace: 'memberList',

  state: {
    getFields,
    search: initialSearch,
    datas: [],
    total: 0,
    selected: [],
    selecteRecord: {},
    addModalVisible: false,
    roleList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen('/member/list', ({ query }) => {
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
      const { data: { content } } = yield callWithLoading(services.system.getRoles, { type: 1, status: 1 });
      yield update({ roleList: content || [] });
    },
    // 获取列表数据
    * fetchDatas({ payload }, { select, update, callWithLoading }) {
      const { search } = yield select(({ memberList }) => memberList);
      const { data: { content, totalElements } } = yield callWithLoading(services.system.getList, formatFormData({ ...search, sortField: 'su.' + search.sortField }));
      yield update({ datas: content, total: totalElements });
    },
    // 新增
    * doAdd({ payload: { param } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.addMember, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.system.editMember, { param, id }, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchDatas' });
    },
    // 删除
    * doDelete({ param }, { update, put, callWithLoading }) {
      yield callWithLoading(services.system.delMember, param, { successMsg: '操作成功' });
      yield update({ selecteRecord: {}, addModalVisible: false });
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
