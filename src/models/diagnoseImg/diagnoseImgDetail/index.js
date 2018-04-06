import Model from 'utils/model';
import { message } from 'antd';
import services from 'services';

export default Model.extend({
  namespace: 'diagnoseImgDetail',

  state: {
    id: '',
    details: {},
    appointList: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/diagnoseImg/add': () => {
          dispatch({ type: 'resetState' });
        },
        '/diagnoseImg/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ diagnoseImgDetail }) => diagnoseImgDetail);
      const { data } = yield callWithLoading(services.diagnoseImg.getInfo, id);
      yield update({ details: data });
    },
    // 查询就诊记录
    * getAppointList({ payload: { param, resolve } }, { callWithLoading, update }) {
      const { data: { content } } = yield callWithLoading(services.diagnoseImg.getAppointList, param);
      if (content.length == 0) {
        message.error('未匹配到对应就诊记录！', 2);
      } else {
        yield update({ appointList: content || [] });
      }
    },
    // 新增
    * doAdd({ payload: { param } }, { update, callWithLoading }) {
      yield callWithLoading(services.diagnoseImg.addData, param);
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
    // 编辑
    * doEdit({ payload: { param, id } }, { update, callWithLoading }) {
      yield callWithLoading(services.diagnoseImg.editData, { param, id });
      yield update({ selecteRecord: {}, addModalVisible: false });
    },
  },

  reducers: {
  }
});
