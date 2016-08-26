import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Address from '../Address';
import ToggleOrderCollection from '../orders/ToggleOrderConnection';

class Customer extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
  };

  render() {
    const { customer = {} } = this.props;

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
            <b>{customer.orderConnection.count}</b>
            <ToggleOrderCollection filter={{ customerID: customer.customerID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default Relay.createContainer(Customer, {
  fragments: {
    customer: () => Relay.QL`
      fragment on Customer {
        customerID
        companyName
        contactName
        contactTitle
        address {
          ${Address.getFragment('address')}
        }
        orderConnection {
          count
        }
      }
    `,
  },
});
