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
    onUpdateState(payload) {
      dispatch({ type: 'roleDetail/updateState', payload: { ...payload } });
    },
    addDatas(param) {
      dispatch({ type: 'roleDetail/addDatas', payload: { param } });
    },
    updateDatas(param, id) {
      dispatch({ type: 'roleDetail/updateDatas', payload: { param, id } });
    },
    goback() {
      dispatch(routerRedux.push('/role/list'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleDetail);
