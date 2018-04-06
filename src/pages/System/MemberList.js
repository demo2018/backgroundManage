import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import MemberList from 'components/System/MemberList';

function mapStateToProps({ memberList }) {
  return {
    ...memberList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'memberList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'memberList/updateSearch', payload: { search } });
      dispatch({ type: 'memberList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'memberList/resetSearch' });
      dispatch({ type: 'memberList/fetchDatas' });
    },
    // 新增管理员
    onAdd(param) {
      dispatch({ type: 'memberList/doAdd', payload: { param } });
    },
    // 更新管理员
    onEdit(param, id) {
      dispatch({ type: 'memberList/doEdit', payload: { param, id } });
    },
    // 删除管理员
    onDelete(param) {
      dispatch({ type: 'memberList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(MemberList));
