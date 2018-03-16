import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import TemplateList from 'components/Case/TemplateList';

function mapStateToProps({ templateList }) {
  return {
    ...templateList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'templateList/updateState', payload: { ...payload } });
    },
    onAdd(param) {
      dispatch({ type: 'templateList/doAdd', payload: { param } });
    },
    onEdit(param) {
      dispatch({ type: 'templateList/doEdit', payload: { param } });
    },
    toList() {
      dispatch(routerRedux.push('/case/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(TemplateList));
