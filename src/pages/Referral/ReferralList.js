import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { createNestPage } from 'utils/common';
import ReferralList from 'components/Referral/ReferralList';

function mapStateToProps({ referralList }) {
  return {
    ...referralList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onUpdateState(payload) {
      dispatch({ type: 'referralList/updateState', payload: { ...payload } });
    },
    onSearch(search) {
      dispatch({ type: 'referralList/updateSearch', payload: { search } });
      dispatch({ type: 'referralList/fetchDatas' });
    },
    onReset() {
      dispatch({ type: 'referralList/resetSearch' });
      dispatch({ type: 'referralList/fetchDatas' });
    },
    onDelete(param) {
      dispatch({ type: 'referralList/doDelete', payload: { param } });
    },
    toDetail(id) {
      dispatch(routerRedux.push(`/referral/detail/${id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ReferralList));
