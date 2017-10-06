/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import ToggleOrderCollection from 'app/orders/ToggleOrderConnection';
import type { Shipper as Data } from './__generated__/Shipper.graphql';

type Props = {
  data: Data,
};

class Shipper extends React.Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>ShipperID</dt>
        <dd>{data.shipperID}</dd>

        <dt>Name</dt>
        <dd>{data.companyName}</dd>

        <dt>Phone</dt>
        <dd>{data.phone}</dd>

        <dt>Total shipped orders</dt>
        <dd>
          <b>{data.orderConnection && data.orderConnection.count}</b>
          <ToggleOrderCollection filter={{ shipVia: data.shipperID }} />
        </dd>
      </dl>
    );
  }
}

export default createFragmentContainer(
  Shipper,
  graphql`
    fragment Shipper on Shipper {
      shipperID
      companyName
      phone
      orderConnection {
        count
      }
    }
  `
);
