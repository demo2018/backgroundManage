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
    onSendMsg() {
      dispatch({ type: 'feedbackList/sendMsg' });
    },
    onDelete(param) {
      dispatch({ type: 'feedbackList/doDelete', payload: { param } });
    },
    appraise(param) {
      dispatch({ type: 'feedbackList/appraise', payload: { param } });
    },
    downFile() {
      dispatch({ type: 'feedbackList/downFile' });
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/feedback/detail/${id}`));
    },
    toAdd() {
      dispatch(routerRedux.push('/feedback/add'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(FeedbackList));
