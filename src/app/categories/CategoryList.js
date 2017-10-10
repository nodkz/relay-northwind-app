/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Category from './Category';
import type { CategoryList_viewer } from './__generated__/CategoryList_viewer.graphql';

type Props = {
  viewer: CategoryList_viewer,
};

class CategoryList extends React.Component<Props> {
  render() {
    const { categoryList } = this.props.viewer;

    if (!categoryList) {
      return <div>Список категорий пуст</div>;
    }

    return (
      <div>
        <h3>Total {categoryList.length} records</h3>

        {categoryList.map((category, i) => <Category key={i} category={category} />)}
      </div>
    );
  }
}

export default createFragmentContainer(
  CategoryList,
  graphql`
    fragment CategoryList_viewer on Viewer {
      categoryList {
        ...Category_category
      }
    }
  `
);
