/* @flow */
/* eslint-disable graphql/template-strings */

import * as React from 'react';
import Relay from 'react-relay/compat';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import relayLoader from 'components/relayLoader';
import Page404 from 'components/Page404';

import Menu from './Menu';
import MainPage from './MainPage';

import CategoryList from './categories/CategoryList';
import CustomerConnection from './customers/CustomerConnection';
import EmployeeList from './employees/EmployeeList';
import OrderConnection from './orders/OrderConnection';
import ProductConnection from './products/ProductConnection';
import RegionList from './regions/RegionList';
import ShipperList from './shippers/ShipperList';
import SupplierConnection from './suppliers/SupplierConnection';

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
                  query: () =>
                    Relay.QL`query OrderConnectionQuery($count: Int!, $cursor: String, $filter: FilterFindManyOrderInput) { viewer }`,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/products"
                render={relayLoader(ProductConnection, {
                  query: () =>
                    Relay.QL`query ProductConnectionQuery($count: Int!, $cursor: String) { viewer }`,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route
                exact
                path="/customers"
                render={relayLoader(CustomerConnection, {
                  query: () =>
                    Relay.QL`query CustomerConnectionQuery($count: Int!, $cursor: String) { viewer }`,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route exact path="/employees" render={relayLoader(EmployeeList)} />
              <Route exact path="/categories" render={relayLoader(CategoryList)} />
              <Route exact path="/shippers" render={relayLoader(ShipperList)} />
              <Route
                exact
                path="/suppliers"
                render={relayLoader(SupplierConnection, {
                  query: () =>
                    Relay.QL`query SupplierConnectionQuery($count: Int!, $cursor: String) { viewer }`,
                  variables: () => ({ count: 10 }),
                })}
              />
              <Route exact path="/regions" render={relayLoader(RegionList)} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
