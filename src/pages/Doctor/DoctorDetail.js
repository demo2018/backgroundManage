import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DoctorDetail from 'components/Doctor/DoctorDetail';

function mapStateToProps({ doctorDetail }) {
  return {
    ...doctorDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'doctorDetail/updateState', payload: { ...payload } });
    },
    // 新增医生信息
    addDatas(param) {
      dispatch({ type: 'doctorDetail/addDatas', payload: { param } });
    },
    // 更新医生信息
    updateDatas(param, id) {
      dispatch({ type: 'doctorDetail/updateDatas', payload: { param, id } });
    },
    // 查询医生列表
    getDoctorList(param, type) {
      dispatch({ type: 'doctorDetail/getDoctorList', payload: { param, type } });
    },
    // 返回列表页面
    goback() {
      dispatch(routerRedux.push('/doctor/doctorList'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
