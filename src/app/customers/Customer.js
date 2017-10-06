/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import ToggleOrderCollection from 'app/orders/ToggleOrderConnection';
import type { Customer as Data } from './__generated__/Customer.graphql';

type Props = {
  data: ?Data,
};

class Customer extends React.Component<Props> {
  render() {
    const { data } = this.props;

    if (!data) return <div>no customer data</div>;

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>CustomerID</dt>
          <dd>{data.customerID}</dd>

          <dt>CompanyName</dt>
          <dd>{data.companyName}</dd>

          <dt>ContactName</dt>
          <dd>{data.contactName}</dd>

          <dt>ContactTitle</dt>
          <dd>{data.contactTitle}</dd>

          <dt>ShipAddress</dt>
          <dd>
            <Address address={data.address} />
          </dd>

          <dt>Total orders</dt>
          <dd>
            <b>{data.orderConnection ? data.orderConnection.count : 0}</b>
            <ToggleOrderCollection filter={{ customerID: data.customerID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Customer,
  graphql`
    fragment Customer on Customer {
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
