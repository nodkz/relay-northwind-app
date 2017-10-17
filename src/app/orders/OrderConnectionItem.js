/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ToggleOrder from './ToggleOrder';
import type { OrderConnectionItem_order } from './__generated__/OrderConnectionItem_order.graphql';

type Props = {
  order: OrderConnectionItem_order,
  relay: Object,
};

class OrderConnectionItem extends React.Component<Props> {
  render() {
    const { order } = this.props;
    const employee = order.employee || {};

    if (!order) return <div>no order data</div>;

    return (
      <div>
        <div className="row">
          <div className="col-sm-1">{order.orderID}</div>
          <div className="col-sm-2">{order.customer && order.customer.companyName}</div>
          <div className="col-sm-2">
            {employee.firstName} {employee.lastName} (id:{order.employeeID})
          </div>
          <div className="col-sm-2">
            {order.shipper && order.shipper.companyName} (id:{order.shipVia})
          </div>
          <div className="col-sm-2">{`${order.orderDate || ''}`.substr(0, 10)}</div>
          <div className="col-sm-2">{order.freight}</div>
        </div>
        {order.orderID && <ToggleOrder id={order.orderID} />}
      </div>
    );
  }
}

export default createFragmentContainer(
  OrderConnectionItem,
  graphql`
    fragment OrderConnectionItem_order on Order {
      id
      orderID
      customerID
      employeeID
      shipVia
      customer {
        companyName
      }
      shipper {
        companyName
      }
      employee {
        firstName
        lastName
      }
      orderDate
      freight
    }
  `
);
