import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import DoctorList from 'components/Doctor/DoctorList';

function mapStateToProps({ doctorList }) {
  return {
    ...doctorList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'doctorList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'doctorList/updateSearch', payload: { search } });
      dispatch({ type: 'doctorList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'doctorList/resetSearch' });
      dispatch({ type: 'doctorList/fetchDatas' });
    },
    // 变更排序事件
    rankChange(id, param) {
      dispatch({ type: 'doctorList/rankChange', payload: { id, param } });
    },
    // 跳转到新增页
    toAdd() {
      dispatch(routerRedux.push('/doctor/add'));
    },
    // 跳转到详情页
    toDetail(id) {
      dispatch(routerRedux.push(`/doctor/detail/${id}`));
    },
    // 跳转到审核页
    toAudit(id) {
      dispatch(routerRedux.push(`/doctor/audits/${id}`));
    },
    // 跳转到邀请进展页
    toProgress(id) {
      dispatch(routerRedux.push(`/doctor/progress/${id}`));
    },
    // 跳转到出诊安排页
    topPlans(id) {
      dispatch(routerRedux.push(`/doctor/plans/${id}`));
    },
    onSendMsg() {
      dispatch({ type: 'doctorList/sendMsg' });
    },
    downFile() {
      dispatch({ type: 'doctorList/downFile' });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(DoctorList));
