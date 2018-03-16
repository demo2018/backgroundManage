import { Dropdown } from 'antd';
import classnames from 'classnames';
import './index.less';

function Box({
  title,
  children,
  getPopupContainer,
}) {
  const titleCls = classnames({
    'h-head-title': true,
    'h-head-acitve': false,
  });

  const renderTitle = () => {
    return (
      <div className={titleCls}>
        {title}
      </div>
    );
  };

  const dropdownProps = {
    placement: 'bottomRight',
    getPopupContainer,
    overlay: <div className="h-head-dropdown">{children}</div>
  };

  return (
    <div>
      {children
        ? <Dropdown {...dropdownProps} >
            {renderTitle()}
          </Dropdown>
        : renderTitle()
      }
    </div>
  );
}

export default Box;
