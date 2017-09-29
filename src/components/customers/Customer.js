/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from '../Address';
import ToggleOrderCollection from '../orders/ToggleOrderConnection';
import type { Customer_customer } from './__generated__/Customer_customer.graphql';

type Props = {
  customer: ?Customer_customer,
};

class Customer extends React.Component<Props> {
  render() {
    const { customer } = this.props;

    if (!customer) return 'no customer data';

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>CustomerID</dt>
          <dd>{customer.customerID}</dd>

          <dt>CompanyName</dt>
          <dd>{customer.companyName}</dd>

          <dt>ContactName</dt>
          <dd>{customer.contactName}</dd>

          <dt>ContactTitle</dt>
          <dd>{customer.contactTitle}</dd>

          <dt>ShipAddress</dt>
          <dd>
            <Address address={customer.address} />
          </dd>

          <dt>Total orders</dt>
          <dd>
            <b>{customer.orderConnection ? customer.orderConnection.count : 0}</b>
            <ToggleOrderCollection filter={{ customerID: customer.customerID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Customer,
  graphql`
    fragment Customer_customer on Customer {
      customerID
      companyName
      contactName
      contactTitle
      address {
        ...Address_address
      }
      orderConnection {
        count
      }
    }
  `
);
