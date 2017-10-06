/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Employee from './Employee';
import type { ToggleEmployeeQueryResponse } from './__generated__/ToggleEmployeeQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleEmployee({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Employee}
      query={() => graphql`
        query ToggleEmployeeQuery($filter: FilterFindOneEmployeeInput) {
          viewer {
            employee(filter: $filter) {
              ...Employee_employee
            }
          }
        }
      `}
      variables={{ filter: { employeeID: id } }}
      prepareProps={(payload: ToggleEmployeeQueryResponse) => ({
        employee: payload.viewer && payload.viewer.employee,
      })}
    />
  );
}
