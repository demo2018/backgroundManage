import { Icon, Menu } from 'antd';

import Box from './Box';

function UserBox({ username, onLogout }) {
  const title = (
    <a>
      <span style={{ display: 'inline-block' }}><Icon type="user" /></span>
      <span style={{ marginLeft: '10px', display: 'inline-block' }}>{username}</span>
    </a>
  );

  return (
    <Box title={title}>
      <Menu onClick={onLogout}>
        <Menu.Item key="logout">退出登陆</Menu.Item>
      </Menu>
    </Box>
  );
}

export default UserBox;
