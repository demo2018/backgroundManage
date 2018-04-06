import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import TagList from 'components/Other/TagList';

function mapStateToProps({ tagList }) {
  return {
    ...tagList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'tagList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'tagList/updateSearch', payload: { search } });
      dispatch({ type: 'tagList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'tagList/resetSearch' });
      dispatch({ type: 'tagList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'tagList/rankChange', payload: { id, param } });
    },
    // 添加子标签
    onAdd(param) {
      dispatch({ type: 'tagList/doAdd', payload: { param } });
    },
    // 编辑子标签
    onEdit(param, id) {
      dispatch({ type: 'tagList/doEdit', payload: { param, id } });
    },
    // 删除子标签
    onDelete(param) {
      dispatch({ type: 'tagList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(TagList));
