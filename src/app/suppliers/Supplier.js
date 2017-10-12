/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Address from 'app/Address';
import ToggleProductCollection from 'app/products/ToggleProductConnection';
import type { Supplier_supplier } from './__generated__/Supplier_supplier.graphql';

type Props = {
  supplier: Supplier_supplier,
};

class Supplier extends React.Component<Props> {
  render() {
    const { supplier } = this.props;

    if (!supplier) {
      return <div>Supplier does not found</div>;
    }

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>SupplierID</dt>
          <dd>{supplier.supplierID}</dd>

          <dt>CompanyName</dt>
          <dd>{supplier.companyName}</dd>

          <dt>ContactName</dt>
          <dd>{supplier.contactName}</dd>

          <dt>ContactTitle</dt>
          <dd>{supplier.contactTitle}</dd>

          <dt>Address</dt>
          <dd>
            <Address address={supplier.address} />
          </dd>

          <dt>Total products</dt>
          <dd>
            <b>{supplier.productConnection && supplier.productConnection.count}</b>
            <ToggleProductCollection filter={{ supplierID: supplier.supplierID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Supplier,
  graphql`
    fragment Supplier_supplier on Supplier {
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
