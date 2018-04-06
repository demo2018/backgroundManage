import { connect } from 'dva';
import ReferralDetail from 'components/Referral/ReferralDetail';

function mapStateToProps({ referralDetail }) {
  return {
    ...referralDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'referralDetail/updateState', payload: { ...payload } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReferralDetail);
