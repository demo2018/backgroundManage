import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DoctorAudits from 'components/Doctor/DoctorAudits';

function mapStateToProps({ doctorAudits }) {
  return {
    ...doctorAudits,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'doctorAudits/updateState', payload: { ...payload } });
    },
    toAudit(param, id) {
      dispatch({ type: 'doctorAudits/toAudit', payload: { param, id } });
    },
    goback() {
      dispatch(routerRedux.push('/doctor/doctorList'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAudits);
