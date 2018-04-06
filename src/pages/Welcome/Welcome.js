import { connect } from 'dva';
import { createNestPage } from 'utils/common';
import Welcome from 'components/Welcome';

function mapStateToProps({ welcome }) {
  return {
    ...welcome,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(createNestPage(Welcome));
