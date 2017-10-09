/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import { Well } from 'react-bootstrap';
import ConnectionLoadMore from 'components/ConnectionLoadMore';
import ProductConnectionItem from './ProductConnectionItem';
import ProductFilter from './ProductFilter';
import ProductHeaders from './ProductHeaders';
// import CreateProduct from './CreateProduct';
import type { ProductConnection_viewer } from './__generated__/ProductConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {|
  viewer: ProductConnection_viewer,
  hideFilter: boolean,
  relay: Object,
|};

class ProductConnection extends React.Component<Props> {
  onFormFilter = (filter: Object) => {
    this.props.relay.setVariables({ filter });
  };

  render() {
    const { hideFilter, relay } = this.props;
    const { productConnection } = this.props.viewer;

    if (!productConnection) {
      return <div>empty product list</div>;
    }

    return (
      <ConnectionLoadMore
        connection={productConnection}
        relay={relay}
        style={{ marginBottom: hideFilter ? '20px' : '200px' }}
        perPage={PER_PAGE}
      >
        {!hideFilter && (
          <Well>
            <ProductFilter onFilter={this.onFormFilter} />
          </Well>
        )}

        <ProductHeaders count={productConnection.count} />
        {productConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <ProductConnectionItem product={node} />
            </div>
          );
        })}
      </ConnectionLoadMore>
    );
  }
}

export const query = graphql`
  query ProductConnectionQuery($count: Int!, $cursor: String, $filter: FilterFindManyProductInput) {
    viewer {
      ...ProductConnection_viewer
    }
  }
`;

export default createPaginationContainer(
  ProductConnection,
  graphql`
    fragment ProductConnection_viewer on Viewer {
      productConnection(first: $count, after: $cursor, filter: $filter) {
        count
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            _id
            ...ProductConnectionItem_product
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.productConnection;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor, filter }, fragmentVariables) {
      return { count, cursor, filter: filter || fragmentVariables.filter };
    },
    query,
  }
);
