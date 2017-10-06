/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import ToggleEmployee from './ToggleEmployee';
import ToggleOrderConnection from 'app/orders/ToggleOrderConnection';
import type { Employee_employee } from './__generated__/Employee_employee.graphql';

type Props = {
  employee: Employee_employee,
};

class Employee extends React.Component<Props> {
  render() {
    const { employee } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>EmployeeID</dt>
        <dd>{employee.employeeID}</dd>

        <dt>Name</dt>
        <dd>
          {employee.firstName} {employee.lastName},
          {employee.titleOfCourtesy}
        </dd>

        <dt>Title</dt>
        <dd>{employee.title}</dd>

        <dt>BirthDate</dt>
        <dd>{`${employee.birthDate || ''}`.substr(0, 10)}</dd>

        <dt>HireDate</dt>
        <dd>{`${employee.hireDate || ''}`.substr(0, 10)}</dd>

        <dt>Notes</dt>
        <dd>{employee.notes}</dd>

        <dt>Home address</dt>
        <dd>
          <Address address={employee.address} />
        </dd>

        <dt>Chief</dt>
        <dd>
          {employee.chief ? (
            <span>
              {employee.chief.firstName} {employee.chief.lastName}
              {employee.reportsTo && <ToggleEmployee id={employee.reportsTo} />}
            </span>
          ) : (
            <span className="text-danger">
              <b>Super boss</b>
            </span>
          )}
        </dd>

        <dt>Total orders</dt>
        <dd>
          <b>{employee.orderConnection && employee.orderConnection.count}</b>
          <ToggleOrderConnection filter={{ employeeID: employee.employeeID }} />
        </dd>
      </dl>
    );
  }
}

export default createFragmentContainer(
  Employee,
  graphql`
    fragment Employee_employee on Employee {
      employeeID
      lastName
      firstName
      title
      titleOfCourtesy
      birthDate
      hireDate
      notes
      reportsTo
      address {
        ...Address_address
      }
      chief {
        lastName
        firstName
      }
      orderConnection {
        count
      }
    }
  `
);
