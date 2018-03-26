import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import TreatmentList from 'components/Treatment/TreatmentList';

function mapStateToProps({ treatmentList }) {
  return {
    ...treatmentList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'treatmentList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'treatmentList/updateSearch', payload: { search } });
      dispatch({ type: 'treatmentList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'treatmentList/resetSearch' });
      dispatch({ type: 'treatmentList/fetchDatas' });
    },
    // 删除事件
    onDelete(param) {
      dispatch({ type: 'treatmentList/doDelete', param });
    },
    // 触发评价事件
    getComment(param) {
      dispatch({ type: 'treatmentList/getComment', param });
    },
    // 触发随访事件
    getManager(param) {
      dispatch({ type: 'treatmentList/getManager', param });
    },
    // 新增随访事件
    addVisit(param) {
      dispatch({ type: 'treatmentList/addVisit', payload: { param } });
    },
    // 更新随访事件
    editVisit(param, id) {
      dispatch({ type: 'treatmentList/editVisit', payload: { param, id } });
    },
    // 删除随访事件
    delVisit(param) {
      dispatch({ type: 'treatmentList/delVisit', param });
    },
    // 导出数据事件
    downFile() {
      dispatch({ type: 'treatmentList/downFile' });
    },
    // 发送短信事件
    onSendMsg() {
      dispatch({ type: 'treatmentList/sendMsg' });
    },
    // 跳转到详情页
    toTreatmentDetail(id) {
      dispatch(routerRedux.push(`/treatment/detail/${id}`));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(TreatmentList));
