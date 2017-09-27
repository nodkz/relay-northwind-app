import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Address from '../Address';
import ToggleOrderCollection from '../orders/ToggleOrderConnection';

class CustomerConnectionItem extends React.Component {
  static propTypes = {
    customer: PropTypes.object.isRequired,
  };

  render() {
    const { customer = {} } = this.props;

    return (
      <div className="row">
        <div className="col-sm-1">{customer.customerID}</div>
        <div className="col-sm-2">{customer.companyName}</div>
        <div className="col-sm-2">{customer.contactName}</div>
        <div className="col-sm-2">{customer.contactTitle}</div>
        <div className="col-sm-2"><Address address={customer.address} /></div>
        <div>
          <b>{customer.orderConnection.count}</b>
          {' '}
          <ToggleOrderCollection filter={{ customerID: customer.customerID }} />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(CustomerConnectionItem, {
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
