/* @flow */

import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup } from 'react-bootstrap';

const InputGroupAddon = InputGroup.Addon;

type Props = {
  onFilter: Function,
};

type State = {
  supplierID: string,
  categoryID: string,
  unitPriceLTE: string,
  unitPriceGTE: string,
};

export default class ProductFilter extends React.Component<Props, State> {
  state: State = {
    supplierID: '',
    categoryID: '',
    unitPriceLTE: '',
    unitPriceGTE: '',
  };

  onChange(e: Event) {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (
        fname === 'supplierID' ||
        fname === 'categoryID' ||
        fname === 'unitPriceLTE' ||
        fname === 'unitPriceGTE'
      ) {
        this.setState({ [fname]: target.value }, this.onFilter);
      }
    }
  }

  onClear() {
    this.setState(
      {
        supplierID: '',
        categoryID: '',
        unitPriceLTE: '',
        unitPriceGTE: '',
      },
      this.onFilter
    );
  }

  onFilter(e: ?Event) {
    if (e) e.preventDefault();
    const { supplierID, categoryID, unitPriceLTE, unitPriceGTE } = this.state;
    const { onFilter } = this.props;

    if (onFilter) {
      onFilter({
        supplierID: supplierID ? supplierID : null, // eslint-disable-line
        categoryID: categoryID ? categoryID : null, // eslint-disable-line
        _operators:
          unitPriceLTE || unitPriceGTE
            ? {
                unitPrice: {
              lte: unitPriceLTE ? unitPriceLTE : null, // eslint-disable-line
              gte: unitPriceGTE ? unitPriceGTE : null, // eslint-disable-line
                },
              }
            : null,
      });
    }
  }

  render() {
    const { supplierID, categoryID, unitPriceLTE, unitPriceGTE } = this.state;

    return (
      <Form inline>
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>CategoryID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="categoryID"
            value={categoryID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>SupplierID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="supplierID"
            value={supplierID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>UnitPrice</ControlLabel>{' '}
          <InputGroup>
            <InputGroupAddon>$</InputGroupAddon>
            <FormControl
              type="number"
              data-name="unitPriceGTE"
              value={unitPriceGTE}
              style={{ width: '70px' }}
              onChange={this.onChange}
            />
            <InputGroupAddon>—</InputGroupAddon>
            <FormControl
              type="number"
              data-name="unitPriceLTE"
              value={unitPriceLTE}
              style={{ width: '70px' }}
              onChange={this.onChange}
            />
          </InputGroup>
        </FormGroup>{' '}
        <Button type="submit" bsStyle="primary" onClick={this.onFilter}>
          Filter
        </Button>{' '}
        <Button type="submit" onClick={this.onClear}>
          Clear
        </Button>
      </Form>
    );
  }
}
