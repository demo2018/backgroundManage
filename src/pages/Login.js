
import { connect } from 'dva';

import HLogin from 'components/HLogin';

function mapStateToProps({ layout }) {
  return {
    ...layout,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLogin(search) {
      dispatch({ type: 'layout/login', payload: { ...search } });
    },
    onSendCaptcha(search) {
      dispatch({ type: 'layout/getCaptcha', payload: { ...search } });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HLogin);
