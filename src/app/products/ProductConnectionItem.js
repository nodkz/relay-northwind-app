/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import ToggleProduct from './ToggleProduct';
import type { ProductConnectionItem_product } from './__generated__/ProductConnectionItem_product.graphql';

type Props = {
  product: ?ProductConnectionItem_product,
};

class ProductConnectionItem extends React.Component<Props> {
  render() {
    const { product } = this.props;

    if (!product) return <div>no product data</div>;

    return (
      <div>
        <div className="row">
          <div className="col-sm-1">{product.productID}</div>
          <div className="col-sm-3">
            {product.name}{' '}
            {product.discontinued ? (
              <span className="text-danger">
                <b>Discontinued</b>
              </span>
            ) : (
              ''
            )}
          </div>
          <div className="col-sm-2">
            {product.category && product.category.name} (id:{product.categoryID})
          </div>
          <div className="col-sm-2">
            {product.supplier && product.supplier.companyName} (id:{product.supplierID})
          </div>
          <div className="col-sm-2">${product.unitPrice}</div>
          <div className="col-sm-2">{product.unitsInStock} pcs</div>
        </div>
        {product.productID && <ToggleProduct id={product.productID} />}
      </div>
    );
  }
}

export default createFragmentContainer(
  ProductConnectionItem,
  graphql`
    fragment ProductConnectionItem_product on Product {
      id
      name
      categoryID
      category {
        name
      }
      supplierID
      supplier {
        companyName
      }
      productID
      quantityPerUnit
      unitPrice
      unitsInStock
      discontinued
    }
  `
);
