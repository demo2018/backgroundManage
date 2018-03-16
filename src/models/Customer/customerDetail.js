import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';
import { memberFields as fields } from './fields';

export default Model.extend({
  namespace: 'customerDetail',

  state: {
    fields,
    id: '',
    relations: [],
    members: [],
    selected: [],
    details: {},
    datas: [],
    addModalVisible: false,
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/customer/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/customer/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchRelations' });
          dispatch({ type: 'fetchDetails' });
        },
      });
    }
  },

  effects: {
    // 获取客户关系列表
    * fetchRelations({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerDetail }) => customerDetail);
      const { data } = yield callWithLoading(services.customer.getList, { id });
      yield update({ datas: data });
    },
    // 获取客户详情
    * fetchDetails({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ customerDetail }) => customerDetail);
      const { data } = yield callWithLoading(services.customer.getInfo, { id });
      yield update({ details: data });
    },
    // 添加客户信息
    * addCustomer({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.customer.addDatas, param, { successMsg: '操作成功' });
      yield put(routerRedux.push(`/customer/detail/${data}`));
    },
    // 更新客户信息
    * updateCustomer({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.customer.upDatas, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetails' });
    },
    // 添加客户关系详情
    * addMember({ payload: { param, id } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.customer.addRelation, { param, id }, { successMsg: '操作成功' });
      yield update({ selectRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchRelations' });
    },
    // 更新客户关系详情
    * updateMember({ payload: { param, id, relationId } }, { put, update, callWithLoading }) {
      yield callWithLoading(services.customer.upRelation, { param, id, relationId }, { successMsg: '操作成功' });
      yield update({ selectRecord: {}, addModalVisible: false });
      yield put({ type: 'fetchRelations' });
    },
    // 删除客户关系详情
    * delMember({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.customer.deleteRelation, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchRelations' });
    },
    // 删除客户详情
    * delCustomer({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.customer.doDelete, param, { successMsg: '操作成功' });
      yield put(routerRedux.push('/customer/customerList'));
    },
    * downFile({ payload }, { select, callWithLoading }) {
      const { selected } = yield select(({ customerDetail }) => customerDetail);
      yield callWithLoading(services.customer.downFile, { selected: selected.join(',') });
    },
  },

  reducers: {
  }
});
