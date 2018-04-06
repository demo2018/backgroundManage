import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RoleDetail from 'components/System/RoleDetail';

function mapStateToProps({ roleDetail }) {
  return {
    ...roleDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'roleDetail/updateState', payload: { ...payload } });
    },
    // 新增角色
    addDatas(param) {
      dispatch({ type: 'roleDetail/addDatas', payload: { param } });
    },
    // 编辑角色
    updateDatas(param, id) {
      dispatch({ type: 'roleDetail/updateDatas', payload: { param, id } });
    },
    // 返回列表页面
    goback() {
      dispatch(routerRedux.push('/role/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetail);
