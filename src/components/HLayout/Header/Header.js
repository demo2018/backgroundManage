import { Icon } from 'antd';
import classnames from 'classnames';

import Box from './Box';
import UserBox from './UserBox';
import './index.less';

function Header({
  layout,
  siderFold,
  username,
  boxList = [],
  onSiderSwitch,
  onLogout,
  renderHeaderContent,
}) {
  const titleCls = classnames({
    'h-head-title': true,
    'h-head-active': false,
  });

  const renderBoxList = () =>
    boxList.map(({ key, title, dropdown }) => {
      const id = `area_${key}`;
      const boxProps = {
        title,
        getPopupContainer: () => document.getElementById(id)
      };

      return (
        <div key={key} className="h-head-box-right" id={id}>
          {dropdown ? <Box {...boxProps}>{dropdown}</Box> : <Box {...boxProps} />}
        </div>
      );
    });

  return (
    <div className="clearfix">
      {layout == 'primary' &&
        <div className="h-head-box-left">
          <div className={titleCls} onClick={onSiderSwitch}>
            <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
          </div>
        </div>
      }
      <div style={{ float: 'left' }}>
        {renderHeaderContent && renderHeaderContent()}
      </div>
      <div className="h-head-box-right">
        <UserBox username={username} onLogout={onLogout} />
      </div>
      {renderBoxList()}
    </div>
  );
}

export default Header;
