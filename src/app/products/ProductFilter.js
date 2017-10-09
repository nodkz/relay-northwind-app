/* @flow */

import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup } from 'react-bootstrap';

const InputGroupAddon = InputGroup.Addon;

type Props = {
  onFilter: Function,
};

type State = {
  supplierID: ?number,
  categoryID: ?number,
  unitPriceLTE: ?number,
  unitPriceGTE: ?number,
};

export default class ProductFilter extends React.Component<Props, State> {
  state: State = {
    supplierID: undefined,
    categoryID: undefined,
    unitPriceLTE: undefined,
    unitPriceGTE: undefined,
  };

  onChange = (e: Event) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (fname === 'supplierID' || fname === 'categoryID') {
        this.setState({ [fname]: parseInt(target.value, 10) || undefined }, this.onFilter);
      } else if (fname === 'unitPriceLTE' || fname === 'unitPriceGTE') {
        this.setState({ [fname]: parseFloat(target.value) || undefined }, this.onFilter);
      }
    }
  };

  onClear = () => {
    this.setState(
      {
        supplierID: undefined,
        categoryID: undefined,
        unitPriceLTE: undefined,
        unitPriceGTE: undefined,
      },
      this.onFilter
    );
  };

  onFilter = (e: ?Event) => {
    if (e) e.preventDefault();
    const { supplierID, categoryID, unitPriceLTE, unitPriceGTE } = this.state;
    const { onFilter } = this.props;

    if (onFilter) {
      onFilter({
        supplierID: supplierID ? supplierID : undefined,
        categoryID: categoryID ? categoryID : undefined,
        _operators:
          unitPriceLTE || unitPriceGTE
            ? {
                unitPrice: {
                  lte: unitPriceLTE ? unitPriceLTE : undefined,
                  gte: unitPriceGTE ? unitPriceGTE : undefined,
                },
              }
            : undefined,
      });
    }
  };

  render() {
    const { supplierID, categoryID, unitPriceLTE, unitPriceGTE } = this.state;

    return (
      <Form inline>
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>CategoryID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="categoryID"
            value={categoryID || ''}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>SupplierID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="supplierID"
            value={supplierID || ''}
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
              value={unitPriceGTE || ''}
              style={{ width: '70px' }}
              onChange={this.onChange}
            />
            <InputGroupAddon>—</InputGroupAddon>
            <FormControl
              type="number"
              data-name="unitPriceLTE"
              value={unitPriceLTE || ''}
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
