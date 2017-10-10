/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import ToggleOrderCollection from 'app/orders/ToggleOrderConnection';
import type { CustomerConnectionItem_customer } from './__generated__/CustomerConnectionItem_customer.graphql';

type Props = {
  customer: CustomerConnectionItem_customer,
};

class CustomerConnectionItem extends React.Component<Props> {
  render() {
    const { customer } = this.props;

    if (!customer) {
      return 'no customer';
    }

    return (
      <div className="row">
        <div className="col-sm-1">{customer.customerID}</div>
        <div className="col-sm-2">{customer.companyName}</div>
        <div className="col-sm-2">{customer.contactName}</div>
        <div className="col-sm-2">{customer.contactTitle}</div>
        <div className="col-sm-2">
          <Address address={customer.address} />
        </div>
        <div>
          <b>{customer.orderConnection ? customer.orderConnection.count : 0}</b>{' '}
          <ToggleOrderCollection filter={{ customerID: customer.customerID }} />
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  CustomerConnectionItem,
  graphql`
    fragment CustomerConnectionItem_customer on Customer {
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
