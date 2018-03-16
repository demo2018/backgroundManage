import Login from './Login';

import './index.less';

function BaseLogin({ onLogin }) {
  const props = {
    onLogin: (values) => { onLogin(values); },
    siteName: '医疗管理后台',
    loading: false,
    type: 'password'
  };

  return (
    <Login {...props} />
  );
}

export default BaseLogin;
