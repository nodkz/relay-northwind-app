/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import ToggleProductCollection from 'app/products/ToggleProductConnection';
import type { Category_category } from './__generated__/Category_category.graphql';

type Props = {
  category: Category_category,
};

class Category extends React.Component<Props> {
  render() {
    const { category } = this.props;

    if (!category) {
      return <div>Категория не найдена</div>;
    }

    return (
      <div className="bordered bspace">
        <dl className="dl-horizontal">
          <dt>CategoryID</dt>
          <dd>{category.categoryID}</dd>

          <dt>Name</dt>
          <dd>{category.name}</dd>

          <dt>Description</dt>
          <dd>{category.description}</dd>

          <dt>Total products</dt>
          <dd>
            <b>{category.productConnection && category.productConnection.count}</b>
            <ToggleProductCollection filter={{ categoryID: category.categoryID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default createFragmentContainer(
  Category,
  graphql`
    fragment Category_category on Category {
      categoryID
      name
      description
      productConnection {
        count
      }
    }
  `
);
