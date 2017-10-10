/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import ToggleOrderCollection from 'app/orders/ToggleOrderConnection';
import type { Shipper_shipper } from './__generated__/Shipper_shipper.graphql';

type Props = {
  shipper: Shipper_shipper,
};

class Shipper extends React.Component<Props> {
  render() {
    const { shipper } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>ShipperID</dt>
        <dd>{shipper.shipperID}</dd>

        <dt>Name</dt>
        <dd>{shipper.companyName}</dd>

        <dt>Phone</dt>
        <dd>{shipper.phone}</dd>

        <dt>Total shipped orders</dt>
        <dd>
          <b>{shipper.orderConnection && shipper.orderConnection.count}</b>
          <ToggleOrderCollection filter={{ shipVia: shipper.shipperID }} />
        </dd>
      </dl>
    );
  }
}

export default createFragmentContainer(
  Shipper,
  graphql`
    fragment Shipper_shipper on Shipper {
      shipperID
      companyName
      phone
      orderConnection {
        count
      }
    }
  `
);
