import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import AwardSet from 'components/System/AwardSet';

function mapStateToProps({ awardSet }) {
  return {
    ...awardSet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'awardSet/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'awardSet/updateSearch', payload: { search } });
      dispatch({ type: 'awardSet/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'awardSet/resetSearch' });
      dispatch({ type: 'awardSet/fetchDatas' });
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(AwardSet));
