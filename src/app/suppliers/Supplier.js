/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import ToggleProductCollection from 'app/products/ToggleProductConnection';
import type { Supplier as Data } from './__generated__/Supplier.graphql';

type Props = {
  data: Data,
};

class Supplier extends React.Component<Props> {
  render() {
    const { data } = this.props;

    if (!data) {
      return <div>Supplier does not found</div>;
    }

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>SupplierID</dt>
          <dd>{data.supplierID}</dd>

          <dt>CompanyName</dt>
          <dd>{data.companyName}</dd>

          <dt>ContactName</dt>
          <dd>{data.contactName}</dd>

          <dt>ContactTitle</dt>
          <dd>{data.contactTitle}</dd>

          <dt>Address</dt>
          <dd>
            <Address address={data.address} />
          </dd>

          <dt>Total products</dt>
          <dd>
            <b>{data.productConnection && data.productConnection.count}</b>
            <ToggleProductCollection filter={{ supplierID: data.supplierID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Supplier,
  graphql`
    fragment Supplier on Supplier {
      supplierID
      companyName
      contactName
      contactTitle
      address {
        ...Address_address
      }
      productConnection {
        count
      }
    }
  `
);
