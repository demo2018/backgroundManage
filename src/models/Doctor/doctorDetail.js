import Model from 'utils/model';
import services from 'services';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'doctorDetail',

  state: {
    id: '',
    details: {},
    inviteInfo: {},
    adeptList: [],
    itemoptions: [],
    doctor1List: [],
    doctor2List: [],
    doctor3List: [],
    doctor4List: []
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/doctor/add': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getAdept' });
          dispatch({ type: 'fetchEnums' });
        },
        '/doctor/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getAdept' });
          dispatch({ type: 'fetchEnums' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取擅长项目
    * getAdept({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getAdept, { typeId: 3 });
      yield update({ adeptList: content || [] });
    },
    // 获取服务项目
    * fetchEnums({ payload }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getItems, { type: 1, status: 1 });
      yield update({ itemoptions: content || [] });
    },
    // 获取医生详情
    * fetchDetail({ payload }, { select, update, callWithLoading }) {
      const { id } = yield select(({ doctorDetail }) => doctorDetail);
      const { data } = yield callWithLoading(services.doctor.getInfo, id);
      yield update({ details: data });
      // 处理推荐医生
      if (data.doctorRecommends) {
        const recommend = yield callWithLoading(services.doctor.getRecommend, { presenter: id });
        for (let i = 0; i < recommend.data.length; i++) {
          if (recommend.data[i].rank == 0) {
            yield update({ doctor1List: [{ id: recommend.data[i].doctorId, realName: recommend.data[i].realName, phone: recommend.data[i].phone }] });
          }
          if (recommend.data[i].rank == 1) {
            yield update({ doctor2List: [{ id: recommend.data[i].doctorId, realName: recommend.data[i].realName, phone: recommend.data[i].phone }] });
          }
          if (recommend.data[i].rank == 2) {
            yield update({ doctor3List: [{ id: recommend.data[i].doctorId, realName: recommend.data[i].realName, phone: recommend.data[i].phone }] });
          }
          if (recommend.data[i].rank == 3) {
            yield update({ doctor4List: [{ id: recommend.data[i].doctorId, realName: recommend.data[i].realName, phone: recommend.data[i].phone }] });
          }
        }
      }
      // 处理邀请医生信息
      if (data.inviteId) {
        const invite = yield callWithLoading(services.doctor.getInfo, data.inviteId);
        yield update({ inviteInfo: { id: invite.data.id, name: invite.data.realName, phone: invite.data.phone } });
      }
    },
    // 获取医生列表
    * getDoctorList({ payload: { param, type } }, { update, callWithLoading }) {
      const { data: { content } } = yield callWithLoading(services.doctor.getDoctorList, param);
      if (type == 1 && content.length != 0) {
        yield update({ doctor1List: content || [] });
      } else if (type == 2 && content.length != 0) {
        yield update({ doctor2List: content || [] });
      } else if (type == 3 && content.length != 0) {
        yield update({ doctor3List: content || [] });
      } else if (type == 4 && content.length != 0) {
        yield update({ doctor4List: content || [] });
      } else {
        message.error('未匹配到相关医生！', 2);
      }
    },
    // 更新医生详情
    * updateDatas({ payload: { param, id } }, { put, callWithLoading }) {
      yield callWithLoading(services.doctor.saveDatas, { param, id }, { successMsg: '操作成功' });
      // yield put({ type: 'fetchDetail' });
      yield put(routerRedux.push('/doctor/doctorList'));
    },
    // 新增医生详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.doctor.addDatas, param, { successMsg: '操作成功' });
      // yield put(routerRedux.push(`/doctor/detail/${data}`));
      yield put(routerRedux.push('/doctor/doctorList'));
    },
  }
});
