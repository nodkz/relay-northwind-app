import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Label } from 'react-bootstrap';
import ToggleCategory from '../categories/ToggleCategory';
import ToggleSupplier from '../suppliers/ToggleSupplier';

class Product extends React.Component {
  static propTypes = {
    product: PropTypes.object,
  };

  render() {
    const { product = {} } = this.props;

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
            <ToggleSupplier id={product.supplierID} />
          </dd>

          <dt>CategoryID</dt>
          <dd>
            {product.categoryID}
            <ToggleCategory id={product.categoryID} />
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

export default Relay.createContainer(Product, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
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
    `,
  },
});
