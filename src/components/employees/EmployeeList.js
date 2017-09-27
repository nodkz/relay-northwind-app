import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Employee from './Employee';


class EmployeeList extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return (
      <div>
        <h3>Total {this.props.viewer.employeeList.length} records</h3>

        { this.props.viewer.employeeList.map((employee, i) =>
          <Employee key={i} employee={employee} />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(EmployeeList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        employeeList {
          ${Employee.getFragment('employee')}
        }
      }
    `,
  },
});
