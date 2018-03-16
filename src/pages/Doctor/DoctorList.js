import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DoctorList from 'components/Doctor/DoctorList';

function mapStateToProps({ doctorList }) {
  return {
    ...doctorList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'doctorList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'doctorList/updateSearch', payload: { search } });
      dispatch({ type: 'doctorList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'doctorList/resetSearch' });
      dispatch({ type: 'doctorList/fetchDatas' });
    },
    onSendMsg() {
      dispatch({ type: 'doctorList/sendMsg' });
    },
    appraise(param) {
      dispatch({ type: 'doctorList/appraise', payload: { param } });
    },
    downFile() {
      dispatch({ type: 'doctorList/downFile' });
    },
    onDelete(param) {
      dispatch({ type: 'doctorList/doDelete', payload: { param } });
    },
    toAdd() {
      dispatch(routerRedux.push('/doctor/add'));
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/doctor/detail/${id}`));
    },
    toAudit(id) {
      dispatch(routerRedux.push(`/doctor/audits/${id}`));
    },
    toProgress(id) {
      dispatch(routerRedux.push(`/doctor/progress/${id}`));
    },
    topPlans(id) {
      dispatch(routerRedux.push(`/doctor/plans/${id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(DoctorList));
