import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Label } from 'react-bootstrap';
import Address from '../Address';
import ToggleEmployee from './ToggleEmployee';

class Employee extends React.Component {
  static propTypes = {
    employee: PropTypes.object.isRequired,
  };

  render() {
    const { employee: emp } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>EmployeeID</dt>
        <dd>{emp.employeeID}</dd>

        <dt>Name</dt>
        <dd>{emp.firstName} {emp.lastName}, {emp.titleOfCourtesy}</dd>

        <dt>Title</dt>
        <dd>{emp.title}</dd>

        <dt>BirthDate</dt>
        <dd>{`${emp.birthDate}`.substr(0, 10)}</dd>

        <dt>HireDate</dt>
        <dd>{`${emp.hireDate}`.substr(0, 10)}</dd>

        <dt>Notes</dt>
        <dd>{emp.notes}</dd>

        <dt>Home address</dt>
        <dd><Address address={emp.address} /></dd>

        <dt>Chief</dt>
        <dd>
          { emp.chief
            ?
            <span>
              {emp.chief.firstName}
              &nbsp;
              {emp.chief.lastName}
              <ToggleEmployee id={emp.reportsTo} />
            </span>
            :
            <h4><Label bsStyle="danger">Super boss</Label></h4>
          }
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
      }
    `,
  },
});
