import classnames from 'classnames';
import { Breadcrumb } from 'antd';
import Nav from './Nav';
import Header from './Header';
import { Link } from 'react-router';
import { REMAIN_CORE_STATE } from 'utils/model';

import './index.less';
import './themes.less';

/**
 * layout组件
 *
 * @props {object} children 儿子节点
 * @props {string} layout 布局
 * @props {string} siteName 站点名称
 * @props {string} theme 颜色主题
 * @props {boolean} isBoxed 是否要boxed布局
 * @props {object} routes 路由信息
 * @props {object} params 路由参数
 * @props {object} nav 侧边栏配置
 * @props {object} header 头部配置
 * @props {Function} renderNav 自定义侧边栏
 * @props {Function} renderHeader 自定义头部
 * @props {Function} renderBreadcrumb 自定义面包屑
 */
class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      siderFold: props.isSiderFold,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('isSiderFold' in nextProps) {
      this.setState({ siderFold: nextProps.isSiderFold });
    }
  }

  handleSwitchSider() {
    this.setState({ siderFold: !this.state.siderFold });
  }

  // layout为normal的时候，logo的背景色为白色
  renderLogoWrapper() {
    const { theme, layout, siteName, renderLogo } = this.props;
    const { siderFold } = this.state;

    const logoWrapperCls = classnames({
      'hlayout-logo-wrapper': true,
      'h-HLayout-center': true,
      [`logo-theme-${theme}`]: layout != 'normal',
    });

    return (
      <div className={logoWrapperCls}>
        {renderLogo
          ? renderLogo()
          : (<div className="h-HLayout-center">
              <span className="hlayout-logo" style={{ backgroundSize: '100%' }} />
              {!siderFold && <span className="hlayout-title">{siteName}</span>}
            </div>)
        }
      </div>
    );
  }

  renderHeaderWrapper() {
    const { layout, renderHeader, user, header } = this.props;
    const { siderFold } = this.state;
    const headerProps = {
      layout,
      siderFold,
      ...user,
      ...header,
      onSiderSwitch: () => this.handleSwitchSider(),
    };

    return (
      <div className={'hlayout-header-wrapper'}>
        {renderHeader && renderHeader() || <Header {...headerProps} />}
      </div>
    );
  }

  renderBreadcrumbWrapper() {
    const { routes, params, renderBreadcrumb } = this.props;
    const breadcrumb = { routes, params };

    function handleLinkClick() {
      // 点击面包屑菜单，则设置REMAIN_CORE_STATE为true，进入新的路由后，如果调用reset action 则只更新部分状态state
      localStorage.setItem(REMAIN_CORE_STATE, true);
    }

    /* eslint-disable  no-shadow */
    function itemRender(route, params, routes, paths) {
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? <span>{route.breadcrumbName}</span> : <Link onClick={handleLinkClick} to={paths.join('/')}>{route.breadcrumbName}</Link>;
    }

    return (
      <div className="hlayout-breadcrumb">
        {renderBreadcrumb && renderBreadcrumb() || <Breadcrumb separator=">" {...breadcrumb} itemRender={itemRender} />}
      </div>
    );
  }

  renderContainerWrapper() {
    const { children } = this.props;

    return (
      <div className="hlayout-container" style={{ minHeight: 'calc(100vh - 110px)' }}>
        {children}
      </div>
    );
  }

  render() {
    const { layout, theme, isBoxed, nav, routes, renderNav } = this.props;
    const { siderFold } = this.state;

    const contentCls = classnames({
      'hlayout-content': true,
      [`hlayout-content-${layout}`]: true,
      'hlayout-boxed': isBoxed,
      'hlayout-fold': layout == 'primary' && siderFold,
      [`hlayout-content-theme-${theme}`]: true,
    });

    const navProps = {
      routes,
      siderFold,
      theme,
      ...nav,
    };

    return (
      <div className={contentCls}>
        {/* 侧边栏 */}
        {layout == 'primary' &&
          <aside>
            {this.renderLogoWrapper()}
            {renderNav && renderNav() || <Nav {...navProps} />}
          </aside>
        }

        {layout == 'primary'
          ? <div className={'hlayout-page-wrapper'}>
              {/* 头部 */}
              {this.renderHeaderWrapper()}
              {/* 面包屑 */}
              {this.renderBreadcrumbWrapper()}
              {/* 页面内容 */}
              {this.renderContainerWrapper()}
            </div>
          : <div className={'hlayout-page-wrapper'}>
              <div>
                {this.renderLogoWrapper()}
                {this.renderHeaderWrapper()}
              </div>
              {this.renderBreadcrumbWrapper()}
              {this.renderContainerWrapper()}
            </div>
        }
      </div>
    );
  }
}

export default Layout;
