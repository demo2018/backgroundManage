import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ProjectDetail from 'components/Project/ProjectDetail';

function mapStateToProps({ projectDetail }) {
  return {
    ...projectDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'projectDetail/updateState', payload: { ...payload } });
    },
    addDatas(param) {
      dispatch({ type: 'projectDetail/addDatas', payload: { param } });
    },
    updateDatas(param, id) {
      dispatch({ type: 'projectDetail/updateDatas', payload: { param, id } });
    },
    toList() {
      dispatch(routerRedux.push('/project/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ProjectDetail));
