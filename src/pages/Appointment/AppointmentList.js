import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import AppointmentList from 'components/Appointment/AppointmentList';

function mapStateToProps({ appointmentList }) {
  return {
    ...appointmentList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'appointmentList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'appointmentList/updateSearch', payload: { search } });
      dispatch({ type: 'appointmentList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'appointmentList/resetSearch' });
      dispatch({ type: 'appointmentList/fetchDatas' });
    },
    // 删除事件
    onDelete(param) {
      dispatch({ type: 'appointmentList/doDelete', param });
    },
    // 跳转到详情页
    toDetail(id) {
      dispatch(routerRedux.push(`/appointment/detail/${id}`));
    },
    // 跳转到新增页
    toAdd() {
      dispatch(routerRedux.push('/appointment/add'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(AppointmentList));
