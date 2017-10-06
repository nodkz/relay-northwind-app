/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Address from 'app/Address';
import ToggleEmployee from './ToggleEmployee';
import ToggleOrderConnection from 'app/orders/ToggleOrderConnection';
import type { Employee as Data } from './__generated__/Employee.graphql';

type Props = {
  data: Data,
};

class Employee extends React.Component<Props> {
  render() {
    const { data } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>EmployeeID</dt>
        <dd>{data.employeeID}</dd>

        <dt>Name</dt>
        <dd>
          {data.firstName} {data.lastName},
          {data.titleOfCourtesy}
        </dd>

        <dt>Title</dt>
        <dd>{data.title}</dd>

        <dt>BirthDate</dt>
        <dd>{`${data.birthDate || ''}`.substr(0, 10)}</dd>

        <dt>HireDate</dt>
        <dd>{`${data.hireDate || ''}`.substr(0, 10)}</dd>

        <dt>Notes</dt>
        <dd>{data.notes}</dd>

        <dt>Home address</dt>
        <dd>
          <Address address={data.address} />
        </dd>

        <dt>Chief</dt>
        <dd>
          {data.chief ? (
            <span>
              {data.chief.firstName} {data.chief.lastName}
              {data.reportsTo && <ToggleEmployee id={data.reportsTo} />}
            </span>
          ) : (
            <span className="text-danger">
              <b>Super boss</b>
            </span>
          )}
        </dd>

        <dt>Total orders</dt>
        <dd>
          <b>{data.orderConnection && data.orderConnection.count}</b>
          <ToggleOrderConnection filter={{ employeeID: data.employeeID }} />
        </dd>
      </dl>
    );
  }
}

export default createFragmentContainer(
  Employee,
  graphql`
    fragment Employee on Employee {
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
