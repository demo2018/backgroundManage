import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ProjectList from 'components/Project/ProjectList';

function mapStateToProps({ projectList }) {
  return {
    ...projectList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'projectList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'projectList/updateSearch', payload: { search } });
      dispatch({ type: 'projectList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'projectList/resetSearch' });
      dispatch({ type: 'projectList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'projectList/rankChange', payload: { id, param } });
    },
    // 删除项目
    onDelete(param) {
      dispatch({ type: 'projectList/doDelete', param });
    },
    // 跳转到详情页面
    toDetail(id) {
      dispatch(routerRedux.push(`/project/detail/${id}`));
    },
    // 跳转到新增页面
    toAdd() {
      dispatch(routerRedux.push('/project/add'));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ProjectList));
