import React from 'react';
import Relay from 'react-relay';
import App from './components/App';
import Page404 from './components/Page404';
import BrokenPage from './components/BrokenPage';
import LoadingPage from './components/LoadingPage';
import MainPage from './components/MainPage';

import CategoryList from './components/categories/CategoryList';
import CustomerConnection from './components/customers/CustomerConnection';
import EmployeeList from './components/employees/EmployeeList';
import OrderConnection from './components/orders/OrderConnection';
import ProductConnection from './components/products/ProductConnection';
import RegionList from './components/regions/RegionList';
import ShipperList from './components/shippers/ShipperList';
import SupplierConnectionViewer from './components/suppliers/SupplierConnectionViewer';

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`,
};

const routes = [
  {
    path: '/',
    component: App,
    indexRoute: {
      component: MainPage,
    },
    childRoutes: [
      {
        path: 'categories',
        component: CategoryList,
        queries: ViewerQueries,
      },
      {
        path: 'customers',
        component: CustomerConnection,
        queries: ViewerQueries,
      },
      {
        path: 'employees',
        component: EmployeeList,
        queries: ViewerQueries,
      },
      {
        path: 'orders',
        component: OrderConnection,
        queries: ViewerQueries,
      },
      {
        path: 'products',
        component: ProductConnection,
        queries: ViewerQueries,
      },
      {
        path: 'regions',
        component: RegionList,
        queries: ViewerQueries,
      },
      {
        path: 'shippers',
        component: ShipperList,
        queries: ViewerQueries,
      },
      {
        path: 'suppliers',
        component: SupplierConnectionViewer,
        queries: ViewerQueries,
      },
      {
        path: '*',
        component: Page404,
      },
    ],
  },
];


// add loaders and error catcher for all routes, also for nested routes if will exist
function addLoaderForRelayComponents(routeList) {
  function addLoader(route) {
    if (route.queries && route.component && !route.render) {
      route.render = (o) => { // eslint-disable-line
        if (o.props) {
          return React.createElement(route.component, o.props);
        }

        if (o.error) {
          return <BrokenPage message={o.error.message} />;
        }

        return <LoadingPage />;
      };
    }
  }

  routeList.forEach(route => {
    if (route.indexRoute) {
      addLoader(route.indexRoute);
    }
    addLoader(route);

    if (route.childRoutes && Array.isArray(route.childRoutes)) {
      addLoaderForRelayComponents(route.childRoutes);
    }
  });
}
addLoaderForRelayComponents(routes);


export default routes;
