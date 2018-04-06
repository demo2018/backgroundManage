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
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'doctorAudits/updateState', payload: { ...payload } });
    },
    // 处理审核
    toAudit(param, id) {
      dispatch({ type: 'doctorAudits/toAudit', payload: { param, id } });
    },
    // 返回列表页面
    goback() {
      dispatch(routerRedux.push('/doctor/doctorList'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorAudits);
