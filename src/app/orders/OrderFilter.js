/* @flow */

import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

type Props = {
  onFilter: (data: { employeeID?: ?number, shipperID?: ?number }) => any,
};

type State = {
  employeeID: ?number,
  shipperID: ?number,
};

export default class OrderFilter extends React.Component<Props, State> {
  state = {
    employeeID: undefined,
    shipperID: undefined,
  };

  onChange = (e: Event) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (fname === 'employeeID' || fname === 'shipperID') {
        this.setState({ [fname]: parseInt(target.value, 10) || undefined }, this.onFilter);
      }
    }
  };

  onClear = () => {
    this.setState(
      {
        employeeID: undefined,
        shipperID: undefined,
      },
      this.onFilter
    );
  };

  onFilter = (e?: Event) => {
    if (e) e.preventDefault();

    if (this.props.onFilter) {
      const { employeeID, shipperID } = this.state;

      this.props.onFilter({
        employeeID: employeeID ? employeeID : undefined,
        shipVia: shipperID ? shipperID : undefined,
      });
    }
  };

  render() {
    const { employeeID, shipperID } = this.state;

    return (
      <Form inline>
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>EmployeeID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="employeeID"
            value={employeeID || ''}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>ShipperID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="shipperID"
            value={shipperID || ''}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
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
