import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Address from '../Address';

class Order extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    this.props.onItemClick(this.props.company._id);
  }

  render() {
    const { customer = {} } = this.props;

    return (
      <div className="row">
        <div className="col-sm-2">{customer.customerID}</div>
        <div className="col-sm-2">{customer.companyName}</div>
        <div className="col-sm-2">{customer.contactName}</div>
        <div className="col-sm-2">{customer.contactTitle}</div>
      </div>
    );
  }
}

export default Relay.createContainer(Order, {
  fragments: {
    order: () => Relay.QL`
      fragment on Order {
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
          ${Address.getFragment('address')}
        }
        details: [OrderDetails]
      }
    `,
  },
});
