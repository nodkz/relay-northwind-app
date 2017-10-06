/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Order from './Order';
import type { ToggleOrderQueryResponse } from './__generated__/ToggleOrderQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleOrder({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Order}
      query={() => graphql`
        query ToggleOrderQuery($filter: FilterFindOneOrderInput) {
          viewer {
            order(filter: $filter) {
              ...Order
            }
          }
        }
      `}
      variables={{ filter: { orderID: id } }}
      prepareProps={(payload: ToggleOrderQueryResponse) => ({
        data: payload.viewer && payload.viewer.order,
      })}
    />
  );
}
