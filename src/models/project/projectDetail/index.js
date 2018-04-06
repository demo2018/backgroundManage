import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'projectDetail',

  state: {
    id: '',
    details: {},
    doctorClassList: [],
    patientClassList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/project/add': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getdoctorClass' });
          dispatch({ type: 'getpatientClass' });
        },
        '/project/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getdoctorClass' });
          dispatch({ type: 'getpatientClass' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取项目详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ projectDetail }) => projectDetail);
      const { data } = yield callWithLoading(services.project.getInfo, id);
      yield update({ details: data });
    },
    // 获取医生端分类
    * getdoctorClass({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.project.getClass, { type: 0, status: 1, sort: 'rank,desc' });
      yield update({ doctorClassList: content });
    },
    // 获取患者端分类
    * getpatientClass({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.project.getClass, { type: 1, status: 1, sort: 'rank,desc' });
      yield update({ patientClassList: content });
    },
    // 更新项目详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.project.editItem, { param, id }, { successMsg: '操作成功' });
      // yield put({ type: 'fetchDetail' });
      yield put(routerRedux.push('/project/list'));
    },
    // 新增项目详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.project.addItem, param, { successMsg: '操作成功' });
      // yield put(routerRedux.push(`/project/detail/${data}`));
      yield put(routerRedux.push('/project/list'));
    },
  },

  reducers: {

  }
});
