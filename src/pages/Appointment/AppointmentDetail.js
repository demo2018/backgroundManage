import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import AppointmentDetail from 'components/Appointment/AppointmentDetail';

function mapStateToProps({ appointmentDetail }) {
  return {
    ...appointmentDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新预约
    updateState(param) {
      dispatch({ type: 'appointmentDetail/updateState', payload: { param } });
    },
    // 更新预约
    updateAppointment(param) {
      dispatch({ type: 'appointmentDetail/updateDatas', payload: { param } });
    },
    // 新增预约
    addAppointment(param) {
      dispatch({ type: 'appointmentDetail/addDatas', payload: { param } });
    },
    // 删除预约
    onDelete(param) {
      dispatch({ type: 'appointmentDetail/delAppointment', param });
    },
    // 查询病人
    getPatientList(param, resolve) {
      dispatch({ type: 'appointmentDetail/getPatientList', payload: { param, resolve } });
    },
    // 查询病人
    getDoctorList(param, resolve) {
      dispatch({ type: 'appointmentDetail/getDoctorList', payload: { param, resolve } });
    },
    // 查询医生日期
    getDoctorDates(param, resolve) {
      dispatch({ type: 'appointmentDetail/getDoctorDates', payload: { param, resolve } });
    },
    // 查询医生时间
    getDoctorTimes(param, resolve) {
      dispatch({ type: 'appointmentDetail/getDoctorTimes', payload: { param, resolve } });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(AppointmentDetail));
