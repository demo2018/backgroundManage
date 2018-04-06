import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import ProjectClassify from 'components/Project/ProjectClassify';

function mapStateToProps({ projectClassify }) {
  return {
    ...projectClassify,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'projectClassify/updateState', payload: { ...payload } });
    },
    // tab切换事件
    onTabChange(tabKey) {
      dispatch({ type: 'projectClassify/tabChange', payload: { tabKey } });
      dispatch({ type: 'projectClassify/fetchDatas' });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'projectClassify/updateSearch', payload: { search } });
      dispatch({ type: 'projectClassify/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'projectClassify/resetSearch' });
      dispatch({ type: 'projectClassify/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'projectClassify/rankChange', payload: { id, param } });
    },
    // 新增项目详情
    onAdd(param) {
      dispatch({ type: 'projectClassify/doAdd', param });
    },
    // 更新项目详情
    onEdit(param, id) {
      dispatch({ type: 'projectClassify/doEdit', payload: { param, id } });
    },
    // 删除项目
    onDelete(param) {
      dispatch({ type: 'projectClassify/doDelete', param });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ProjectClassify));
