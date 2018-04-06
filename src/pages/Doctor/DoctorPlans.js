import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import DoctorPlans from 'components/Doctor/DoctorPlans';

function mapStateToProps({ doctorPlans }) {
  return {
    ...doctorPlans,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'doctorPlans/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'doctorPlans/updateSearch', payload: { search } });
      dispatch({ type: 'doctorPlans/fetchDetail' });
    },
    // 删除出诊
    onDeletes(param) {
      dispatch({ type: 'doctorPlans/onDeletes', param });
    },
    // 出诊安排
    toPlans(param) {
      dispatch({ type: 'doctorPlans/toPlans', param });
    },
    // 返回列表页
    goback() {
      dispatch(routerRedux.push('/doctor/doctorList'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorPlans);
