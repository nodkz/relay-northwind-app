import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Employee from './Employee';

class EmployeeList extends React.Component {
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
    const { employeeList = [] } = this.props;

    return (
      <div>
        { employeeList.map((employee, i) => {
          return <Employee key={i} employee={employee} />
        })}
      </div>
    );
  }
}

export default Relay.createContainer(EmployeeList, {
  fragments: {
    employeeList: () => Relay.QL`
      fragment on Employee @relay(plural: true) {
        ${Employee.getFragment('employee')}
      }
    `,
  },
});
