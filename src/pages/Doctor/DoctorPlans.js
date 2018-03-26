import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DoctorPlans from 'components/Doctor/DoctorPlans';

function mapStateToProps({ doctorPlans }) {
  return {
    ...doctorPlans,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'doctorPlans/updateState', payload: { ...payload } });
    },
    toPlans(param) {
      dispatch({ type: 'doctorPlans/toPlans', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPlans);
