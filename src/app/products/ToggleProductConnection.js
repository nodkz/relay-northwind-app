/* @flow */

import React from 'react';
import Toggler from 'components/Toggler';
import ProductConnection, { query } from './ProductConnection';
import type { ProductConnectionQueryResponse } from './__generated__/ProductConnectionQuery.graphql';

type Props = {
  filter: Object,
};

export default function ToggleProductConnection({ filter }: Props) {
  return (
    <Toggler
      component={ProductConnection}
      query={query}
      variables={{ filter, count: 10 }}
      prepareProps={(payload: ProductConnectionQueryResponse) => ({
        viewer: payload.viewer,
        hideFilter: true,
      })}
    />
  );
}
