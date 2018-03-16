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
    onUpdateState(payload) {
      dispatch({ type: 'doctorDetail/updateState', payload: { ...payload } });
    },
    addDatas(param) {
      dispatch({ type: 'doctorDetail/addDatas', payload: { param } });
    },
    updateDatas(param, id) {
      dispatch({ type: 'doctorDetail/updateDatas', payload: { param, id } });
    },
    goback() {
      dispatch(routerRedux.push('/doctor/doctorList'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
