/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import ToggleProductCollection from 'app/products/ToggleProductConnection';
import type { Category as Data } from './__generated__/Category.graphql';

type Props = {
  data: Data,
};

class Category extends React.Component<Props> {
  render() {
    const { data } = this.props;

    if (!data) {
      return <div>Категория не найдена</div>;
    }

    return (
      <div className="bordered bspace">
        <dl className="dl-horizontal">
          <dt>CategoryID</dt>
          <dd>{data.categoryID}</dd>

          <dt>Name</dt>
          <dd>{data.name}</dd>

          <dt>Description</dt>
          <dd>{data.description}</dd>

          <dt>Total products</dt>
          <dd>
            <b>{data.productConnection && data.productConnection.count}</b>
            <ToggleProductCollection filter={{ categoryID: data.categoryID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Category,
  graphql`
    fragment Category on Category {
      categoryID
      name
      description
      productConnection {
        count
      }
    }
  `
);
