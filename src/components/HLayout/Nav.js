import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';

// 合并数组
export function merge(source, dest) {
  return [...source, ...dest].reduce((occ, key) => occ.includes(key) ? occ : occ.concat([key]), []);
}

const SubMenu = Menu.SubMenu;

/**
 * 导航菜单组件
 *
 * @props menus 菜单列表
 * @props defaultSelectedKey 选择的菜单项
 * @props defaultOpenKeys 打开的菜单目录
 * @props siderFold 是否折叠
 * @props onMenuChange
 */
export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.getRelativedKeysByRoutes(props);
  }

  componentWillReceiveProps(nextProps) {
    // 每次routes改变后，重设selectedKeys，并将route对应的openKeys与当前openKeys合并
    if (nextProps.menus && nextProps.routes) {
      const { selectedKeys, openKeys } = this.getRelativedKeysByRoutes(nextProps);
      this.setState({
        selectedKeys,
        openKeys: merge(this.state.openKeys, openKeys)
      });
    }
  }

  // 从routes中解析出当前path
  getCurrentPath(routes) {
    return routes.reduce((arr, route) => {
      const keys = route.path.split('/').filter(key => !!key);
      return [...arr, ...keys];
    }, []).join('/');
  }

  // 从当前route中解析出对应的openKeys以及selectedKey
  getRelativedKeysByRoutes({ menus, routes }) {
    let index = 0;
    let selectedKeys = [];
    let openKeys = [];
    const { pathname } = this.props;
    const path = pathname || this.getCurrentPath(routes);
    const traversedKeys = [];

    traverseMenus(menus);

    // openKeys最后一个为selectKey
    if (openKeys.length) {
      selectedKeys = [openKeys.pop()];
    }

    return { openKeys, selectedKeys };

    function traverseMenus(menus) {
      if (!menus) return;

      menus.forEach((menu) => {
        if (!menu.hasOwnProperty('key')) {
          menu.key = `menuKey${index++}`;
        }

        traversedKeys.push(menu.key);

        // 保证两个路径的进行比较的时候，都是以'/'开头
        const routePath = path.startsWith('/') ? path : `/${path}`;
        const menuPath = (menu.path && menu.path.startsWith('/') ? menu.path : `/${menu.path}`) || '';

        // 如果当前路径匹配菜单
        if (routePath.startsWith(menuPath)) {
          openKeys = [...traversedKeys];
        }
        traverseMenus(menu.children);
        traversedKeys.pop();
      });
    }
  }

  // 点击菜单栏则直接更新state中对应的keys
  handleKeysChange(keys) {
    const { openKeys, selectedKey } = keys;
    if (openKeys) {
      this.setState({ openKeys });
    }
    if (selectedKey) {
      this.setState({ selectedKeys: [selectedKey] });
    }
    const { onMenuChange } = this.props;
    onMenuChange && onMenuChange(keys);
  }

  renderDeepMenus(menus, isTopLevel) {
    const { siderFold } = this.props;
    return menus.map(({ children, key, icon, title, path }) =>
      children ? (
        <SubMenu key={key} title={<span><Icon type={icon} />{siderFold && isTopLevel ? '' : title}</span>}>
          {this.renderDeepMenus(children, false)}
        </SubMenu>
      ) : (
          <Menu.Item key={key}>
            <Link to={path} ><Icon type={icon} />{siderFold && isTopLevel ? '' : title}</Link>
          </Menu.Item>
        )
    );
  }

  render() {
    const { menus, theme = 'blue', siderFold, mode } = this.props;
    const { openKeys, selectedKeys } = this.state;
    return (
      <Menu
        mode={mode || (siderFold ? 'vertical' : 'inline')}
        theme={theme}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={(keys) => { this.handleKeysChange({ openKeys: keys }); }}
        onSelect={({ key }) => { this.handleKeysChange({ selectedKey: key }); }}
      >
        {this.renderDeepMenus(menus, true)}
      </Menu>
    );
  }
}

