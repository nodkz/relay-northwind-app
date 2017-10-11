/* @flow */
/* eslint-disable graphql/template-strings */

import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import relayLoader from 'components/relayLoader';
import Page404 from 'components/Page404';

import Menu from './Menu';
import MainPage from './MainPage';

import CategoryList, { query as CategoryListQuery } from './categories/CategoryList';
import CustomerConnection, {
  query as CustomerConnectionQuery,
} from './customers/CustomerConnection';
import EmployeeList, { query as EmployeeListQuery } from './employees/EmployeeList';
import OrderConnection, { query as OrderConnectionQuery } from './orders/OrderConnection';
import ProductConnection, { query as ProductConnectionQuery } from './products/ProductConnection';
import RegionList, { query as RegionListQuery } from './regions/RegionList';
import ShipperList, { query as ShipperListQuery } from './shippers/ShipperList';
import SupplierConnection, {
  query as SupplierConnectionQuery,
} from './suppliers/SupplierConnection';

export default class App extends React.Component<Object> {
  render() {
    return (
      <div style={{ paddingTop: '10px' }}>
        <Router>
          <div>
            <Menu />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route
                exact
                path="/orders"
                render={relayLoader(OrderConnection, {
                  query: OrderConnectionQuery,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/products"
                render={relayLoader(ProductConnection, {
                  query: ProductConnectionQuery,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/customers"
                render={relayLoader(CustomerConnection, {
                  query: CustomerConnectionQuery,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/employees"
                render={relayLoader(EmployeeList, { query: EmployeeListQuery })}
              />
              <Route
                exact
                path="/categories"
                render={relayLoader(CategoryList, { query: CategoryListQuery })}
              />
              <Route
                exact
                path="/shippers"
                render={relayLoader(ShipperList, { query: ShipperListQuery })}
              />
              <Route
                exact
                path="/suppliers"
                render={relayLoader(SupplierConnection, {
                  query: SupplierConnectionQuery,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/regions"
                render={relayLoader(RegionList, { query: RegionListQuery })}
              />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
