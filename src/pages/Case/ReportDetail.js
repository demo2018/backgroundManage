import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ReportDetail from 'components/Case/ReportDetail';

function mapStateToProps({ reportDetail }) {
  return {
    ...reportDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'reportDetail/updateState', payload: { ...payload } });
    },
    onAdd(param) {
      dispatch({ type: 'reportDetail/doAdd', payload: { param } });
    },
    onEdit(param) {
      dispatch({ type: 'reportDetail/doEdit', payload: { param } });
    },
    toList() {
      dispatch(routerRedux.push('/report/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ReportDetail));
