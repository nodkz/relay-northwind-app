import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import EmployeeList from './EmployeeList';


class EmployeeListViewer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return <EmployeeList employeeList={this.props.viewer.employeeList} />;
  }
}

export default Relay.createContainer(EmployeeListViewer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        employeeList {
          ${EmployeeList.getFragment('employeeList')}
        }
      }
    `,
  },
});
