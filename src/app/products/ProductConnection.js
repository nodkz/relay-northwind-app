/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import { Well } from 'react-bootstrap';
import Loading from 'components/Loading';
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
  scrollContainer: ?HTMLElement;

  componentDidMount() {
    setTimeout(() => this.loadNextItemsIfNeeded(), 500);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll = () => {
    if (!this.props.relay.hasMore()) {
      window.removeEventListener('scroll', this.onScroll);
    }
    this.loadNextItemsIfNeeded();
  };

  loadNextItemsIfNeeded() {
    if (this.props.relay.isLoading()) return;

    const elem = this.scrollContainer;
    if (!elem) return;

    const contentHeight = elem.offsetHeight;
    const y = window.pageYOffset + window.innerHeight;
    if (y >= contentHeight) {
      this.loadNextItems();
    }
  }

  loadNextItems() {
    if (!this.props.relay.hasMore() || this.props.relay.isLoading()) return;

    this.props.relay.loadMore(PER_PAGE, () => {
      this.forceUpdate(); // for hidding loader
    });
    this.forceUpdate(); // for showing loader
  }

  onFormFilter = (filter: Object) => {
    this.props.relay.setVariables({ filter });
  };

  render() {
    const { hideFilter } = this.props;
    const { productConnection } = this.props.viewer;

    if (!productConnection) {
      return <div>empty product list</div>;
    }

    return (
      <div
        onScroll={this.onScroll}
        ref={c => (this.scrollContainer = c)}
        style={{ marginBottom: hideFilter ? '20px' : '200px' }}
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

        {productConnection.pageInfo.hasNextPage && <Loading />}
      </div>
    );
  }
}

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
      return { count, cursor, filter };
    },
    query: graphql`
      query ProductConnectionQuery(
        $count: Int!
        $cursor: String
        $filter: FilterFindManyProductInput
      ) {
        viewer {
          ...ProductConnection_viewer
        }
      }
    `,
  }
);
