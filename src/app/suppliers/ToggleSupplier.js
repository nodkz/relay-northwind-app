/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Supplier from './Supplier';
import type { ToggleSupplierQueryResponse } from './__generated__/ToggleSupplierQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleSupplier({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Supplier}
      query={() => graphql`
        query ToggleSupplierQuery($filter: FilterFindOneSupplierInput) {
          viewer {
            supplier(filter: $filter) {
              ...Supplier
            }
          }
        }
      `}
      variables={{ filter: { supplierID: id } }}
      prepareProps={(payload: ToggleSupplierQueryResponse) => ({
        data: payload.viewer && payload.viewer.supplier,
      })}
    />
  );
}
