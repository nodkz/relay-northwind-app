import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button, Label } from 'react-bootstrap';
import Loading from 'react-loading';
import Product from './Product';
import { relayStore } from '../../clientStores';

class ProductConnectionItem extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    viewer: PropTypes.object,
    relay: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      additionalData: null,
    };

    this.openClose = this.openClose.bind(this);
  }

  openClose() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.additionalData) {
      const query = Relay.createQuery(
        Relay.QL`query {
          node(id:$id) {
            ${Product.getFragment('product')}
          }
        }`,
        { id: this.props.product.id }
      );
      relayStore.primeCache({ query }, readyState => {
        if (readyState.done) {
          const data = relayStore.readQuery(query)[0];
          this.setState({ additionalData: data });
        }
      });
    }
  }

  render() {
    const { product = {} } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <div
          onClick={this.openClose}
          style={{ cursor: 'pointer' }}
          className={['row', 'bgOnHover', isOpen ? 'bg-primary' : ''].join(' ')}
        >
          <div className="col-sm-1">{product.productID}</div>
          <div className="col-sm-3">
            {product.name}
            &nbsp;
            {product.discontinued ? <Label bsStyle="danger">Discontinued</Label> : ''}
          </div>
          <div className="col-sm-2">{product.category.name}</div>
          <div className="col-sm-2">{product.unitPrice}</div>
          <div className="col-sm-2">{product.unitsInStock}</div>
          <div className="col-sm-1">
            <Button bsSize="xsmall">
              { isOpen ? 'Close' : 'Open' }
            </Button>
          </div>
        </div>
        { isOpen && (
          this.state.additionalData
          ? <div className="lrspace bspace">
            <Product product={this.state.additionalData} />
          </div>
          : <Loading type="bubbles" color="#3385b5" />
        )}
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
