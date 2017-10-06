/* @flow */

import React from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

type Props = {
  onFilter: (data: { employeeID?: string, shipperID?: string }) => any,
};

type State = {
  employeeID: string,
  shipperID: string,
};

export default class OrderFilter extends React.Component<Props, State> {
  state = {
    employeeID: '',
    shipperID: '',
  };

  onChange = (e: Event) => {
    const { target } = e;
    if (target instanceof HTMLInputElement) {
      const fname = target.getAttribute('data-name');
      if (fname === 'employeeID' || fname === 'shipperID') {
        this.setState({ [fname]: target.value }, this.onFilter);
      }
    }
  };

  onClear = () => {
    this.setState(
      {
        employeeID: '',
        shipperID: '',
      },
      this.onFilter
    );
  };

  onFilter = (e?: Event) => {
    if (e) e.preventDefault();

    if (this.props.onFilter) {
      const { employeeID, shipperID } = this.state;

      this.props.onFilter({
        employeeID: employeeID ? employeeID : '',
        shipVia: shipperID ? shipperID : '',
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
            value={employeeID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>{' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>ShipperID</ControlLabel>{' '}
          <FormControl
            type="number"
            data-name="shipperID"
            value={shipperID}
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
