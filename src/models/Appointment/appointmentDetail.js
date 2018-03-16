import Model from 'utils/model';
import services from 'services';
import { routerRedux } from 'dva/router';

export default Model.extend({
  namespace: 'appointmentDetail',

  state: {
    id: '',
    details: {},
    projectList: [],
    patientList: [],
    doctorList: [],
    doctorDates: [],
    doctorTimes: [],
    hospitalList: [],
  },

  subscriptions: {
    setupSubscriber({ listen, dispatch }) {
      listen({
        '/appointment/add': () => {
          dispatch({ type: 'resetState' });
          dispatch({ type: 'getAllDoctorList' });
          dispatch({ type: 'getProjectList' });
        },
        '/appointment/detail/:id': ({ params }) => {
          const id = params[0];
          dispatch({ type: 'resetState' });
          dispatch({ type: 'updateState', payload: { id } });
          dispatch({ type: 'getAllDoctorList' });
          dispatch({ type: 'getProjectList' });
          dispatch({ type: 'fetchDetail' });
        },
      });
    }
  },

  effects: {
    // 获取预约详情
    * fetchDetail({ payload }, { put, select, update, callWithLoading }) {
      const { id } = yield select(({ appointmentDetail }) => appointmentDetail);
      const { data } = yield callWithLoading(services.appointment.getInfo, { id });
      const { doctorId, doctorName, patientId, patientName, time, hospitalId, hospitalName } = data;

      yield update({
        details: data,
        patientList: [{ customerId: patientId, customerName: patientName }],
        doctorList: [{ id: doctorId, realName: doctorName }],
        hospitalList: [{ value: hospitalId, label: hospitalName }],
      });

      yield put({ type: 'getDoctorDates', payload: { param: { doctorId } } });
      yield put({ type: 'getDoctorTimes', payload: { param: { id: doctorId, date: time } } });
    },
    // 更新预约详情
    * updateDatas({ payload: { param } }, { put, callWithLoading }) {
      yield callWithLoading(services.appointment.editInfo, param, { successMsg: '操作成功' });
      yield put({ type: 'fetchDetail' });
    },
    // 新增预约详情
    * addDatas({ payload: { param } }, { put, callWithLoading }) {
      const { data } = yield callWithLoading(services.appointment.addInfo, param, { successMsg: '操作成功' });
      yield put(routerRedux.push(`/appointment/detail/${data}`));
    },
    // 删除预约
    * delAppointment({ param }, { put, callWithLoading }) {
      yield callWithLoading(services.appointment.doDelete, param, { successMsg: '操作成功' });
      yield put(routerRedux.push('/appointment/appointmentList'));
    },
    // 获取项目列表
    * getProjectList({ payload: { param, resolve } = {} }, { put, callWithLoading, update }) {
      const { data: { content = [] } = {} } = yield callWithLoading(services.appointment.getProjectList, param);
      yield update({ projectList: content });
    },
    // 获取病人列表
    * getPatientList({ payload: { param, resolve } }, { put, callWithLoading, update }) {
      const { data } = yield callWithLoading(services.appointment.getPatientList, param);
      yield update({ patientList: data || [] });
    },
    // 获取医生列表
    * getDoctorList({ payload: { param = {}, resolve } = {} }, { put, callWithLoading, update }) {
      const { data } = yield callWithLoading(services.appointment.getDoctorList, param);
      yield update({ doctorList: data || [] });
    },
    // 获取医生列表
    * getAllDoctorList({ payload }, { put, callWithLoading, update }) {
      const { data: { content } } = yield callWithLoading(services.appointment.getAllDoctorList);
      yield update({ doctorList: content || [] });
    },
    // 获取医生日期
    * getDoctorDates({ payload: { param, resolve } }, { put, callWithLoading, update }) {
      const { data: { content = [] } = {} } = yield callWithLoading(services.appointment.getDoctorDates, param);
      yield update({ doctorDates: content });
    },
    // 获取医生时间
    * getDoctorTimes({ payload: { param, resolve } }, { put, callWithLoading, update }) {
      const { data: { visitPlans = [] } = {} } = yield callWithLoading(services.appointment.getDoctorTimes, param);
      yield update({ doctorTimes: visitPlans });
    },
  }
});
