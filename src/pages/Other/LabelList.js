import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import LabelList from 'components/Other/LabelList';

function mapStateToProps({ labelList }) {
  return {
    ...labelList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'labelList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'labelList/updateSearch', payload: { search } });
      dispatch({ type: 'labelList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'labelList/resetSearch' });
      dispatch({ type: 'labelList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'labelList/rankChange', payload: { id, param } });
    },
    // 添加标签
    onAdd(param) {
      dispatch({ type: 'labelList/doAdd', payload: { param } });
    },
    // 编辑标签
    onEdit(param, id) {
      dispatch({ type: 'labelList/doEdit', payload: { param, id } });
    },
    // 删除标签
    onDelete(param) {
      dispatch({ type: 'labelList/doDelete', param });
    },
    // 跳转至子标签列表页面
    toTag(param) {
      localStorage.setItem('typeId', param);
      dispatch(routerRedux.push('/tag/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(LabelList));
