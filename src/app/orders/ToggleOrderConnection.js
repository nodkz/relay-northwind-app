/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import OrderConnection from './OrderConnection';
import type { ToggleOrderConnectionQueryResponse } from './__generated__/ToggleOrderConnectionQuery.graphql';

type Props = {
  filter: Object,
};

export default function ToggleOrderConnection({ filter }: Props) {
  return (
    <Toggler
      component={OrderConnection}
      query={() => graphql`
        query ToggleOrderConnectionQuery($filter: FilterFindManyOrderInput) {
          viewer {
            ...OrderConnection_viewer
          }
        }
      `}
      variables={{ filter }}
      prepareProps={(payload: ToggleOrderConnectionQueryResponse) => ({
        viewer: payload.viewer,
      })}
    />
  );
}
