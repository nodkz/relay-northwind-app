import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Label } from 'react-bootstrap';
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
            {product.discontinued ? <Label bsStyle="danger">Discontinued</Label> : ''}
          </div>
          <div className="col-sm-2">{product.category.name}</div>
          <div className="col-sm-2">{product.unitPrice}</div>
          <div className="col-sm-2">{product.unitsInStock}</div>
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
        category {
          name
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
