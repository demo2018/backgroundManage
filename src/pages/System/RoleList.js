import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import RoleList from 'components/System/RoleList';

function mapStateToProps({ roleList }) {
  return {
    ...roleList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'roleList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'roleList/updateSearch', payload: { search } });
      dispatch({ type: 'roleList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'roleList/resetSearch' });
      dispatch({ type: 'roleList/fetchDatas' });
    },
    onAdd(param) {
      dispatch({ type: 'roleList/doAdd', payload: { param } });
    },
    onEdit(param, id) {
      dispatch({ type: 'roleList/doEdit', payload: { param, id } });
    },
    onDelete(param) {
      dispatch({ type: 'roleList/doDelete', param });
    },
    // 跳转到详情页
    toDetail(id) {
      dispatch(routerRedux.push(`/role/detail/${id}`));
    },
    // 跳转到新增页
    toAdd() {
      dispatch(routerRedux.push('/role/add'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(RoleList));
