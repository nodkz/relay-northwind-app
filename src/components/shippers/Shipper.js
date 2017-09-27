import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import ToggleOrderCollection from '../orders/ToggleOrderConnection';

class Shipper extends React.Component {
  static propTypes = {
    shipper: PropTypes.object.isRequired,
  };

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
          <b>{shipper.orderConnection.count}</b>
          <ToggleOrderCollection filter={{ shipVia: shipper.shipperID }} />
        </dd>
      </dl>
    );
  }
}

export default Relay.createContainer(Shipper, {
  fragments: {
    shipper: () => Relay.QL`
      fragment on Shipper {
        shipperID
        companyName
        phone
        orderConnection {
          count
        }
      }
    `,
  },
});
