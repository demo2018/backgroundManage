import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router';
import menus from 'configs/menus';
import qs from 'qs';
import cookie from 'js-cookie';
import HLayout from 'components/HLayout';

function Layout({
  dispatch,
  children,
  routes,
  params,
  layout,
}) {
  const { siteName, nav } = layout;
  const boxList = [];
  const username = cookie.get('username');
  const props = {
    siteName,
    layout: 'primary',
    theme: 'dark',
    isAsideFixed: true,
    routes,
    nav: {
      ...nav,
      menus,
    },
    user: {
      username,
    },
    header: {
      boxList,
      onLogout: () => {
        dispatch({ type: 'layout/logout' });
      }
    },
    renderBreadcrumb: () => {
      const [first, ...breadcrumbRoutes] = routes;
      const breadcrumb = {
        routes: breadcrumbRoutes,
        params,
        itemRender: (route, params, routes, paths) => {
          const isLast = routes.indexOf(route) === routes.length - 1;
          const path = route.path && `${route.path}?${qs.stringify({ notResetState: true })} `;
          return (isLast || !path) ? <span>{route.breadcrumbName}</span> : <Link to={path}>{route.breadcrumbName}</Link>;
        }
      };
      return <Breadcrumb separator="/" {...breadcrumb} />;
    }
  };

  return (
    <HLayout {...props}>
      {children}
    </HLayout >
  );
}

function mapStateToProps({ layout }) {
  return {
    layout
  };
}

export default connect(mapStateToProps)(Layout);
