import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Address extends React.Component {
  render() {
    const { address = {} } = this.props;

    return (
      <div>
        {address.street}<br />
        {address.city}, {address.region || ''} {address.postalCode}, {address.country}<br />
        <abbr title="Phone">P:</abbr> {address.phone}
      </div>
    );
  }
}

export default Relay.createContainer(Address, {
  fragments: {
    address: () => Relay.QL`
      fragment on CustomerAddress {
        street
        city
        region
        postalCode
        country
        phone
      }
    `,
  },
});
