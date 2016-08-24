import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Address from '../Address';

class Employee extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    this.props.onItemClick(this.props.company._id);
  }

  render() {
    const { employee: emp } = this.props;

    return (
      <dl className="dl-horizontal">
        <dt>EmployeeID</dt>
        <dd>{emp.employeeID}</dd>

        <dt>Name</dt>
        <dd>{emp.firstName} {emp.lastName}, {emp.titleOfCourtesy}</dd>

        <dt>Title</dt>
        <dd>{emp.title}</dd>

        <dt>BirthDate</dt>
        <dd>{`${emp.birthDate}`.substr(0,10)}</dd>

        <dt>HireDate</dt>
        <dd>{`${emp.hireDate}`.substr(0,10)}</dd>

        <dt>Notes</dt>
        <dd>{emp.notes}</dd>

        <dt>Home address</dt>
        <dd><Address address={emp.address} /></dd>

        <dt>Chief</dt>
        <dd>
          { emp.chief
            ? `${emp.chief.firstName} ${emp.chief.lastName}`
            : 'Super boss'
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
