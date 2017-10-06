/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import { Label } from 'react-bootstrap';
import ToggleCategory from 'app/categories/ToggleCategory';
import ToggleSupplier from 'app/suppliers/ToggleSupplier';
import type { Product as Data } from './__generated__/Product.graphql';

type Props = {
  data: Data,
};

class Product extends React.Component<Props> {
  render() {
    const { data } = this.props;

    if (!data) {
      return <div>product not found</div>;
    }

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>ProductID</dt>
          <dd>{data.productID}</dd>

          <dt>Name</dt>
          <dd>{data.name}</dd>

          <dt>SupplierID</dt>
          <dd>
            {data.supplierID}
            {data.supplierID && <ToggleSupplier id={data.supplierID} />}
          </dd>

          <dt>CategoryID</dt>
          <dd>
            {data.categoryID}
            {data.categoryID && <ToggleCategory id={data.categoryID} />}
          </dd>

          <dt>QuantityPerUnit</dt>
          <dd>{data.quantityPerUnit}</dd>

          <dt>UnitPrice</dt>
          <dd>{data.unitPrice}</dd>

          <dt>UnitsInStock</dt>
          <dd>{data.unitsInStock}</dd>

          <dt>UnitsOnOrder</dt>
          <dd>{data.unitsOnOrder}</dd>

          <dt>ReorderLevel</dt>
          <dd>{data.reorderLevel}</dd>

          <dt>Discontinued</dt>
          <dd>{data.discontinued ? <Label bsStyle="danger">Discontinued</Label> : 'nope'}</dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Product,
  graphql`
    fragment Product on Product {
      productID
      name
      supplierID
      categoryID
      quantityPerUnit
      unitPrice
      unitsInStock
      unitsOnOrder
      reorderLevel
      discontinued
    }
  `
);
