/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';
import { relayStore } from 'clientStores';
import { Form, FormGroup, Col, FormControl, Button } from 'react-bootstrap';

type Props = {
  onCreate?: Function,
  onCancel?: Function,
};

type State = {
  name: ?string,
  unitPrice: ?number,
  unitsInStock: ?number,
  supplierID: ?number,
  categoryID: ?number,
};

export default class CreateProduct extends React.Component<Props, State> {
  state: State = {
    name: undefined,
    unitPrice: undefined,
    unitsInStock: 10,
    supplierID: 666,
    categoryID: 666,
  };

  onSubmit = () => {
    const variables = {
      input: {
        record: {
          productID: Math.round(Date.now() / 1000),
          ...this.state,
        },
      },
    };

    relayStore.mutate({
      query: Relay.QL`mutation createProduct {
        createProduct(input: $input) {
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
      onSuccess: () => {
        if (this.props.onCreate) this.props.onCreate(this.state);
      },
    });
  };

  onCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
  };

  onChange = (e: Event) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (fname === 'name') {
        this.setState({ [fname]: target.value });
      } else if (fname === 'unitsInStock' || fname === 'supplierID' || fname === 'categoryID') {
        this.setState({ [fname]: parseInt(target.value, 10) || undefined });
      } else if (fname === 'unitPrice') {
        this.setState({ [fname]: parseFloat(target.value) || undefined });
      }
    }
  };

  render() {
    const { name, unitPrice, unitsInStock, supplierID, categoryID } = this.state;

    return (
      <div>
        <h4>Add new product:</h4>
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Col sm={2}>Title</Col>
            <FormControl
              sm={10}
              type="text"
              style={{ width: '170px' }}
              data-name="name"
              value={name || ''}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Col sm={2}>Price</Col>
            <FormControl
              sm={10}
              type="number"
              style={{ width: '70px' }}
              data-name="unitPrice"
              value={unitPrice || ''}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Col sm={2}>Category ID</Col>
            <FormControl
              sm={10}
              type="number"
              style={{ width: '70px' }}
              data-name="categoryID"
              value={categoryID || ''}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Col sm={2}>Supplier ID</Col>
            <FormControl
              sm={10}
              type="number"
              style={{ width: '70px' }}
              data-name="supplierID"
              value={supplierID || ''}
              onChange={this.onChange}
            />
          </FormGroup>
          <FormGroup>
            <Col sm={2}>In Stock</Col>
            <FormControl
              sm={10}
              type="number"
              style={{ width: '70px' }}
              data-name="unitsInStock"
              value={unitsInStock || ''}
              onChange={this.onChange}
            />
          </FormGroup>
          <Button type="submit" bsStyle="primary">
            Create
          </Button>{' '}
          <Button onClick={this.onCancel}>Cancel</Button>
        </Form>
      </div>
    );
  }
}
