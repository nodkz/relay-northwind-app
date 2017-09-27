import React, { PropTypes } from 'react';
import {
  Form, FormGroup, ControlLabel, FormControl, Button, InputGroup,
} from 'react-bootstrap';

const InputGroupAddon = InputGroup.Addon;

export default class ProductFilter extends React.Component {
  static propTypes = {
    onFilter: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      supplierID: '',
      categoryID: '',
      unitPriceLTE: '',
      unitPriceGTE: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  onChange(event) {
    const fname = event.target.getAttribute('data-name');
    this.setState(
      {
        [fname]: event.target.value,
      },
      this.onFilter
    );
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

  onFilter(e) {
    if (e) e.preventDefault();

    if (this.props.onFilter) {
      const { supplierID, categoryID, unitPriceLTE, unitPriceGTE } = this.state;

      this.props.onFilter({
        supplierID: supplierID ? supplierID : null, // eslint-disable-line
        categoryID: categoryID ? categoryID : null, // eslint-disable-line
        _operators: (unitPriceLTE || unitPriceGTE)
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
          <ControlLabel>CategoryID</ControlLabel>
          {' '}
          <FormControl
            type="number"
            data-name="categoryID"
            value={categoryID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>
        {' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>SupplierID</ControlLabel>
          {' '}
          <FormControl
            type="number"
            data-name="supplierID"
            value={supplierID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>
        {' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>UnitPrice</ControlLabel>
          {' '}
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
        </FormGroup>
        {' '}
        <Button type="submit" bsStyle="primary" onClick={this.onFilter}>Filter</Button>
        {' '}
        <Button type="submit" onClick={this.onClear}>Clear</Button>
      </Form>
    );
  }
}
