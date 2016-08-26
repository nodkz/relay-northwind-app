import React, { PropTypes } from 'react';
import {
  Form, FormGroup, ControlLabel, FormControl, Button,
} from 'react-bootstrap';

export default class OrderFilter extends React.Component {
  static propTypes = {
    onFilter: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      employeeID: '',
      shipperID: '',
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
        employeeID: '',
        shipperID: '',
      },
      this.onFilter
    );
  }

  onFilter(e) {
    if (e) e.preventDefault();

    if (this.props.onFilter) {
      const { employeeID, shipperID } = this.state;

      this.props.onFilter({
        employeeID: employeeID ? employeeID : null, // eslint-disable-line
        shipVia: shipperID ? shipperID : null, // eslint-disable-line
      });
    }
  }

  render() {
    const { employeeID, shipperID } = this.state;

    return (
      <Form inline>
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>EmployeeID</ControlLabel>
          {' '}
          <FormControl
            type="number"
            data-name="employeeID"
            value={employeeID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>
        {' '}
        <FormGroup style={{ marginRight: '20px' }}>
          <ControlLabel>ShipperID</ControlLabel>
          {' '}
          <FormControl
            type="number"
            data-name="shipperID"
            value={shipperID}
            style={{ width: '70px' }}
            onChange={this.onChange}
          />
        </FormGroup>
        {' '}
        <Button type="submit" bsStyle="primary" onClick={this.onFilter}>Filter</Button>
        {' '}
        <Button type="submit" onClick={this.onClear}>Clear</Button>
      </Form>
    );
  }
}
