import { connect } from 'dva';
import DoctorProgress from 'components/Doctor/DoctorProgress';

function mapStateToProps({ doctorProgress }) {
  return {
    ...doctorProgress,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'doctorProgress/updateState', payload: { ...payload } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorProgress);
