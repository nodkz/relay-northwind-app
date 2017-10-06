/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import Toggler from 'components/Toggler';
import Category from './Category';
import type { ToggleCategoryQueryResponse } from './__generated__/ToggleCategoryQuery.graphql';

type Props = {
  id: ?number,
};

export default function ToggleCategory({ id }: Props) {
  if (!id) return null;

  return (
    <Toggler
      component={Category}
      query={() => graphql`
        query ToggleCategoryQuery($filter: FilterFindOneCategoryInput) {
          viewer {
            category(filter: $filter) {
              ...Category
            }
          }
        }
      `}
      variables={{ filter: { categoryID: id } }}
      prepareProps={(payload: ToggleCategoryQueryResponse) => ({
        data: payload.viewer && payload.viewer.category,
      })}
    />
  );
}
