import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import FeedbackDetail from 'components/Feedback/FeedbackDetail';

function mapStateToProps({ feedbackDetail }) {
  return {
    ...feedbackDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'feedbackDetail/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'feedbackDetail/updateSearch', payload: { search } });
      dispatch({ type: 'feedbackDetail/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'feedbackDetail/resetSearch' });
      dispatch({ type: 'feedbackDetail/fetchDatas' });
    },
    onSendMsg() {
      dispatch({ type: 'feedbackDetail/sendMsg' });
    },
    appraise(param) {
      dispatch({ type: 'feedbackDetail/appraise', payload: { param } });
    },
    downFile() {
      dispatch({ type: 'feedbackDetail/downFile' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(FeedbackDetail));
