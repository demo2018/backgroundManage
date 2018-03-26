import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import FeedbackList from 'components/Feedback/FeedbackList';

function mapStateToProps({ feedbackList }) {
  return {
    ...feedbackList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'feedbackList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'feedbackList/updateSearch', payload: { search } });
      dispatch({ type: 'feedbackList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'feedbackList/resetSearch' });
      dispatch({ type: 'feedbackList/fetchDatas' });
    },
    // 触发随访事件
    getManager(param) {
      dispatch({ type: 'feedbackList/getManager', param });
    },
    // 新增随访事件
    addFollow(param) {
      dispatch({ type: 'feedbackList/addFollow', payload: { param } });
    },
    // 更新随访事件
    editFollow(param, id) {
      dispatch({ type: 'feedbackList/editFollow', payload: { param, id } });
    },
    // 删除随访事件
    delFollow(param) {
      dispatch({ type: 'feedbackList/delFollow', param });
    },
    onDelete(param) {
      dispatch({ type: 'feedbackList/doDelete', param });
    },
    downFile() {
      dispatch({ type: 'feedbackList/downFile' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(FeedbackList));
