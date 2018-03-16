import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DoctorProgress from 'components/Doctor/DoctorProgress';

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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProgress);
