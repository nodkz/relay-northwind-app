import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import ToggleProduct from './ToggleProduct';

class ProductConnectionItem extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    relay: PropTypes.object,
  };

  render() {
    const { product = {} } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-sm-1">{product.productID}</div>
          <div className="col-sm-3">
            {product.name}
            {' '}
            {product.discontinued ? <span className="text-danger"><b>Discontinued</b></span> : ''}
          </div>
          <div className="col-sm-2">
            {product.category.name}
            {' '}
            (id:{product.categoryID})
          </div>
          <div className="col-sm-2">
            {product.supplier.companyName}
            {' '}
            (id:{product.supplierID})
          </div>
          <div className="col-sm-2">${product.unitPrice}</div>
          <div className="col-sm-2">{product.unitsInStock} pcs</div>
        </div>
        <ToggleProduct id={product.productID} />
      </div>
    );
  }
}

export default Relay.createContainer(ProductConnectionItem, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
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
    `,
  },
});
