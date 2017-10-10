/* @flow */

import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import type { Address_address } from './__generated__/Address_address.graphql';

type Props = {
  address: ?Address_address,
};

class Address extends React.Component<Props> {
  static propTypes = {
    address: PropTypes.object.isRequired,
  };

  render() {
    const { address } = this.props;
    if (!address) return null;

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

export default createFragmentContainer(
  Address,
  graphql`
    fragment Address_address on CustomerAddress {
      street
      city
      region
      postalCode
      country
      phone
    }
  `
);
