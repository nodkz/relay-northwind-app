/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import ProductConnection from './ProductConnection';
import type { ToggleProductConnectionQueryResponse } from './__generated__/ToggleProductConnectionQuery.graphql';

type Props = {
  filter: Object,
};

export default function ToggleProductConnection({ filter }: Props) {
  return (
    <Toggler
      component={ProductConnection}
      query={() => graphql`
        query ToggleProductConnectionQuery($filter: FilterFindManyProductInput) {
          viewer {
            ...ProductConnection_viewer
          }
        }
      `}
      variables={{ filter }}
      prepareProps={(payload: ToggleProductConnectionQueryResponse) => ({
        viewer: payload.viewer,
      })}
    />
  );
}
