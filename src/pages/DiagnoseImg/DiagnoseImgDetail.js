import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DiagnoseImgDetail from 'components/DiagnoseImg/DiagnoseImgDetail';

function mapStateToProps({ diagnoseImgDetail }) {
  return {
    ...diagnoseImgDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'diagnoseImgDetail/updateState', payload: { ...payload } });
    },
    onAdd(param) {
      dispatch({ type: 'diagnoseImgDetail/doAdd', payload: { param } });
    },
    onEdit(param) {
      dispatch({ type: 'diagnoseImgDetail/doEdit', payload: { param } });
    },
    toList() {
      dispatch(routerRedux.push('/diagnoseImg/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(DiagnoseImgDetail));
