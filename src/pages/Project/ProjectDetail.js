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
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'projectDetail/updateState', payload: { ...payload } });
    },
    // 新增项目详情
    addDatas(param) {
      dispatch({ type: 'projectDetail/addDatas', payload: { param } });
    },
    // 更新项目详情
    updateDatas(param, id) {
      dispatch({ type: 'projectDetail/updateDatas', payload: { param, id } });
    },
    // 跳转至项目列表
    toList() {
      dispatch(routerRedux.push('/project/list?notResetState=true '));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ProjectDetail));
