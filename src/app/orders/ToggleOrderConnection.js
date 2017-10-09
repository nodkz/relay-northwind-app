/* @flow */

import React from 'react';
import Toggler from 'components/Toggler';
import OrderConnection, { query } from './OrderConnection';
import type { OrderConnectionQueryResponse } from './__generated__/OrderConnectionQuery.graphql';

type Props = {
  filter: Object,
};

export default function ToggleOrderConnection({ filter }: Props) {
  return (
    <Toggler
      component={OrderConnection}
      query={query}
      variables={{ filter, count: 10 }}
      prepareProps={(payload: OrderConnectionQueryResponse) => ({
        viewer: payload.viewer,
        hideFilter: true,
      })}
    />
  );
}
