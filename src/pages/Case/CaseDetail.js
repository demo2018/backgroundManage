import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import CaseDetail from 'components/Case/CaseDetail';

function mapStateToProps({ caseDetail }) {
  return {
    ...caseDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'caseDetail/updateState', payload: { ...payload } });
    },
    onAdd(param) {
      dispatch({ type: 'caseDetail/doAdd', payload: { param } });
    },
    onEdit(param) {
      dispatch({ type: 'caseDetail/doEdit', payload: { param } });
    },
    toList() {
      dispatch(routerRedux.push('/case/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(CaseDetail));
