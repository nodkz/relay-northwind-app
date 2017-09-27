import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';

class Address extends React.Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
  };

  render() {
    const { address = {} } = this.props;

    return (
      <div>
        {address.street}
        <br />
        {address.city}, {address.region || ''} {address.postalCode}, {address.country}
        <br />
        {address.phone && (
          <span>
            <abbr title="Phone">P:</abbr> {address.phone}
          </span>
        )}
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
