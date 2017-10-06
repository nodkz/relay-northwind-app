/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import OrderDetails from './OrderDetails';
import ToggleCustomer from 'app/customers/ToggleCustomer';
import ToggleEmployee from 'app/employees/ToggleEmployee';
import ToggleShipper from 'app/shippers/ToggleShipper';
import type { Order as Data } from './__generated__/Order.graphql';

type Props = {
  data: ?Data,
};

class Order extends React.Component<Props> {
  render() {
    const { data } = this.props;

    if (!data) return 'no order data';

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>OrderID</dt>
          <dd>{data.orderID}</dd>

          <dt>CustomerID</dt>
          <dd>
            {data.customerID}
            <ToggleCustomer id={data.customerID} />
          </dd>

          <dt>EmployeeID</dt>
          <dd>
            {data.employeeID}
            <ToggleEmployee id={data.employeeID} />
          </dd>

          <dt>OrderDate</dt>
          <dd>{`${data.orderDate || ''}`.substr(0, 10)}</dd>

          <dt>RequiredDate</dt>
          <dd>{`${data.requiredDate || ''}`.substr(0, 10)}</dd>

          <dt>ShippedDate</dt>
          <dd>{`${data.shippedDate || ''}`.substr(0, 10)}</dd>

          <dt>ShipVia</dt>
          <dd>
            {data.shipVia}
            <ToggleShipper id={data.shipVia} />
          </dd>

          <dt>Freight</dt>
          <dd>{data.freight}</dd>

          <dt>ShipAddress</dt>
          <dd>
            <i>{data.shipName}</i>
            <Address address={data.shipAddress} />
          </dd>
        </dl>
        <div className="lrspace">
          <OrderDetails details={data.details} />
        </div>
      </div>
    );
  }
}

export default createFragmentContainer(
  Order,
  graphql`
    fragment Order on Order {
      orderID
      customerID
      employeeID
      orderDate
      requiredDate
      shippedDate
      shipVia
      freight
      shipName
      shipAddress {
        ...Address_address
      }
      details {
        ...OrderDetails_details
      }
    }
  `
);
