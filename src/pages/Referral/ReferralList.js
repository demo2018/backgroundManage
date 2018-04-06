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
    // 更新事件
    onUpdateState(payload) {
      dispatch({ type: 'referralList/updateState', payload: { ...payload } });
    },
    // 搜索事件
    onSearch(search) {
      dispatch({ type: 'referralList/updateSearch', payload: { search } });
      dispatch({ type: 'referralList/fetchDatas' });
    },
    // 重置事件
    onReset() {
      dispatch({ type: 'referralList/resetSearch' });
      dispatch({ type: 'referralList/fetchDatas' });
    },
    // 发送转诊报告
    downReport(param) {
      dispatch({ type: 'referralList/downReport', param });
    },
    // 跳转至详情页面
    toDetail(id) {
      dispatch(routerRedux.push(`/referral/detail/${id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(ReferralList));
