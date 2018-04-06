import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import ProjectDiscount from 'components/Project/ProjectDiscount';

function mapStateToProps({ projectDiscount }) {
  return {
    ...projectDiscount,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'projectDiscount/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'projectDiscount/updateSearch', payload: { search } });
      dispatch({ type: 'projectDiscount/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'projectDiscount/resetSearch' });
      dispatch({ type: 'projectDiscount/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'projectDiscount/rankChange', payload: { id, param } });
    },
    // 新增折扣详情
    onAdd(param) {
      dispatch({ type: 'projectDiscount/doAdd', param });
    },
    // 更新折扣详情
    onEdit(param, id) {
      dispatch({ type: 'projectDiscount/doEdit', payload: { param, id } });
    },
    // 删除项目
    onDelete(param) {
      dispatch({ type: 'projectDiscount/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ProjectDiscount));
