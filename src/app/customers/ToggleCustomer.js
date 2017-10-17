/* @flow */

import React from 'react';
import { graphql } from 'react-relay';
import Toggler from 'components/Toggler';
import Customer from './Customer';
import type { ToggleCustomerQueryResponse } from './__generated__/ToggleCustomerQuery.graphql';

type Props = {
  id: ?string,
};

export default function ToggleCustomer({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Customer}
      query={graphql`
        query ToggleCustomerQuery($filter: FilterFindOneCustomerInput) {
          viewer {
            customer(filter: $filter) {
              ...Customer_customer
            }
          }
        }
      `}
      variables={{ filter: { customerID: id } }}
      prepareProps={(payload: ToggleCustomerQueryResponse) => ({
        customer: payload.viewer && payload.viewer.customer,
      })}
    />
  );
}
