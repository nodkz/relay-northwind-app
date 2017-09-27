import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Address from '../Address';
import ToggleEmployee from './ToggleEmployee';
import ToggleOrderConnection from '../orders/ToggleOrderConnection';

class Employee extends React.Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
  };

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
        <dd>{`${employee.birthDate}`.substr(0, 10)}</dd>

        <dt>HireDate</dt>
        <dd>{`${employee.hireDate}`.substr(0, 10)}</dd>

        <dt>Notes</dt>
        <dd>{employee.notes}</dd>

        <dt>Home address</dt>
        <dd><Address address={employee.address} /></dd>

        <dt>Chief</dt>
        <dd>
          { employee.chief
            ?
            <span>
              {employee.chief.firstName}
              {' '}
              {employee.chief.lastName}
              <ToggleEmployee id={employee.reportsTo} />
            </span>
            :
            <span className="text-danger"><b>Super boss</b></span>
          }
        </dd>

        <dt>Total orders</dt>
        <dd>
          <b>{employee.orderConnection.count}</b>
          <ToggleOrderConnection filter={{ employeeID: employee.employeeID }} />
        </dd>
      </dl>
    );
  }
}

export default Relay.createContainer(Employee, {
  fragments: {
    employee: () => Relay.QL`
      fragment on Employee {
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
          ${Address.getFragment('address')}
        }
        chief {
          lastName
          firstName
        }
        orderConnection {
          count
        }
      }
    `,
  },
});
