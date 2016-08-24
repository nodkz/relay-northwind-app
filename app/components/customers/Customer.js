import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Address from '../Address';

class Customer extends React.Component {
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
        <div className="col-sm-2"><Address address={customer.address} /></div>
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
      }
    `,
  },
});
