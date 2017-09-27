import React from 'react';
import {
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  InputGroup,
  Well,
} from 'react-bootstrap';

export default class CreateProduct extends React.Component {
  constructor() {
    this.onCreateProduct = this.onCreateProduct.bind(this);
  }

  onCreateProduct(productArgs) {
    const variables = {};

    // todo: need to wire all of this up with variables!
    // WIP for now
    relayStore.mutate({
      query: Relay.QL`mutation createProduct {
        createProduct(input: {
          record: {
            name: $name
            unitPrice: 2
            categoryID:2
            unitsInStock:5
            supplierID: 2
          }
        }) {
          record {
            supplierID
            categoryID
            name
            unitsInStock
            unitPrice
          }
        }
      }`,
      variables,
    });
  }

  static propTypes = {
    onCreateProduct: React.PropTypes.func,
  };

  render() {
    const { onCreateProduct } = this.props;

    return (
      <div>
        <h2>Create new product:</h2>
        <Well>
          <Form inline>
            <FormGroup>
              <ControlLabel>Title</ControlLabel>
              <FormControl type="text" data-name="Title" style={{ width: '70px' }} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Category ID</ControlLabel>
              <FormControl type="number" data-name="categoryID" style={{ width: '70px' }} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Supplier ID</ControlLabel>
              <FormControl type="number" data-name="SupplierID" style={{ width: '70px' }} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Price</ControlLabel>
              <FormControl type="number" data-name="Price" style={{ width: '70px' }} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>In Stock</ControlLabel>
              <FormControl type="number" data-name="InStock" style={{ width: '70px' }} />
            </FormGroup>
            <Button type="submit" bsStyle="primary" onClick={onCreateProduct}>
              Create
            </Button>
          </Form>
        </Well>
      </div>
    );
  }
}
