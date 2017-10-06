/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Shipper from './Shipper';
import type { ToggleShipperQueryResponse } from './__generated__/ToggleShipperQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleShipper({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Shipper}
      query={() => graphql`
        query ToggleShipperQuery($filter: FilterFindOneShipperInput) {
          viewer {
            shipper(filter: $filter) {
              ...Shipper
            }
          }
        }
      `}
      variables={{ filter: { shipperID: id } }}
      prepareProps={(payload: ToggleShipperQueryResponse) => ({
        data: payload.viewer && payload.viewer.shipper,
      })}
    />
  );
}
