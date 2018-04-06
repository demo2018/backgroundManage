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
    // 触发设置保存
    toSet(param) {
      dispatch({ type: 'awardSet/doEdit', param });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(AwardSet));
