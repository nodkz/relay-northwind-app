/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Employee from './Employee';
import type { EmployeeList_viewer } from './__generated__/EmployeeList_viewer.graphql';

type Props = {
  viewer: EmployeeList_viewer,
};

class EmployeeList extends React.Component<Props> {
  render() {
    const { employeeList } = this.props.viewer;

    if (!employeeList) {
      return <div>Employee list is empty</div>;
    }

    return (
      <div>
        <h3>Total {employeeList.length} records</h3>

        {employeeList.map((employee, i) => <Employee key={i} employee={employee} />)}
      </div>
    );
  }
}

export default createFragmentContainer(
  EmployeeList,
  graphql`
    fragment EmployeeList_viewer on Viewer {
      employeeList {
        ...Employee_employee
      }
    }
  `
);
