/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import { Label } from 'react-bootstrap';
import ToggleCategory from 'app/categories/ToggleCategory';
import ToggleSupplier from 'app/suppliers/ToggleSupplier';
import type { Product_product } from './__generated__/Product_product.graphql';

type Props = {
  product: Product_product,
};

class Product extends React.Component<Props> {
  render() {
    const { product } = this.props;

    if (!product) {
      return <div>product not found</div>;
    }

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>ProductID</dt>
          <dd>{product.productID}</dd>

          <dt>Name</dt>
          <dd>{product.name}</dd>

          <dt>SupplierID</dt>
          <dd>
            {product.supplierID}
            {product.supplierID && <ToggleSupplier id={product.supplierID} />}
          </dd>

          <dt>CategoryID</dt>
          <dd>
            {product.categoryID}
            {product.categoryID && <ToggleCategory id={product.categoryID} />}
          </dd>

          <dt>QuantityPerUnit</dt>
          <dd>{product.quantityPerUnit}</dd>

          <dt>UnitPrice</dt>
          <dd>{product.unitPrice}</dd>

          <dt>UnitsInStock</dt>
          <dd>{product.unitsInStock}</dd>

          <dt>UnitsOnOrder</dt>
          <dd>{product.unitsOnOrder}</dd>

          <dt>ReorderLevel</dt>
          <dd>{product.reorderLevel}</dd>

          <dt>Discontinued</dt>
          <dd>{product.discontinued ? <Label bsStyle="danger">Discontinued</Label> : 'nope'}</dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Product,
  graphql`
    fragment Product_product on Product {
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
