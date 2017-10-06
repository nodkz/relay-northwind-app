/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Product from './Product';
import type { ToggleProductQueryResponse } from './__generated__/ToggleProductQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleProduct({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Product}
      query={() => graphql`
        query ToggleProductQuery($filter: FilterFindOneProductInput) {
          viewer {
            product(filter: $filter) {
              ...Product_product
            }
          }
        }
      `}
      variables={{ filter: { productID: id } }}
      prepareProps={(payload: ToggleProductQueryResponse) => ({
        product: payload.viewer && payload.viewer.product,
      })}
    />
  );
}
