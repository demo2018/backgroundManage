import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'projectDetail',

  state: {
    id: '',
    details: {},
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/project/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/project/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
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
    // 更新项目详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.project.saveDatas, { param, id }, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 新增项目详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.project.addDatas, param, { successMsg: '操作成功' });
      yield put(routerRedux.push(`/project/detail/${data}`));
    },
  },

  reducers: {
  }
});