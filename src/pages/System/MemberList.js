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
    onUpdateState(payload) {
      dispatch({ type: 'memberList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'memberList/updateSearch', payload: { search } });
      dispatch({ type: 'memberList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'memberList/resetSearch' });
      dispatch({ type: 'memberList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'memberList/doAdd', payload: { param } });
    },
    onEdit(param, id) {
      dispatch({ type: 'memberList/doEdit', payload: { param, id } });
    },
    onDelete(param) {
      dispatch({ type: 'memberList/doDelete', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(MemberList));
