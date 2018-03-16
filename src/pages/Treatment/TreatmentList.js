import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import TreatmentList from 'components/Treatment/TreatmentList';

function mapStateToProps({ treatmentList }) {
  return {
    ...treatmentList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'treatmentList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'treatmentList/updateSearch', payload: { search } });
      dispatch({ type: 'treatmentList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'treatmentList/resetSearch' });
      dispatch({ type: 'treatmentList/fetchDatas' });
    },
    onSendMsg() {
      dispatch({ type: 'treatmentList/sendMsg' });
    },
    onDelete(param) {
      dispatch({ type: 'treatmentList/doDelete', payload: { param } });
    },
    onAssess(param) {
      dispatch({ type: 'treatmentList/doAssess', payload: { param } });
    },
    onVisit(param) {
      dispatch({ type: 'treatmentList/doVisit', payload: { param } });
    },
    downFile() {
      dispatch({ type: 'treatmentList/downFile' });
    },
    toAppointmentDetail(id) {
      dispatch(routerRedux.push(`/treatment/detail/${id}`));
    },
    toAdd() {
      dispatch(routerRedux.push('/treatment/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(TreatmentList));
