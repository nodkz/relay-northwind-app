/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import { Well } from 'react-bootstrap';
import Loading from 'components/Loading';
import OrderConnectionItem from './OrderConnectionItem';
import OrderFilter from './OrderFilter';
import OrderHeaders from './OrderHeaders';
import type { OrderConnection_viewer } from './__generated__/OrderConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {
  viewer: OrderConnection_viewer,
  relay: Object,
  hideFilter: boolean,
};

class OrderConnection extends React.Component<Props> {
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
    const { orderConnection } = this.props.viewer;

    if (!orderConnection) {
      return <div>empty order list</div>;
    }

    return (
      <div
        onScroll={this.onScroll}
        ref={c => {
          this.scrollContainer = c;
        }}
        style={{ marginBottom: hideFilter ? '20px' : '200px' }}
      >
        {!hideFilter && (
          <Well>
            <OrderFilter onFilter={this.onFormFilter} />
          </Well>
        )}

        <OrderHeaders count={orderConnection.count} />

        {orderConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <OrderConnectionItem order={node} />
            </div>
          );
        })}

        {orderConnection.pageInfo.hasNextPage && <Loading />}
      </div>
    );
  }
}

export default createPaginationContainer(
  OrderConnection,
  graphql`
    fragment OrderConnection_viewer on Viewer {
      orderConnection(first: $count, after: $cursor, filter: $filter)
        @connection(key: "OrderConnection_orderConnection") {
        count
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            _id
            ...OrderConnectionItem_order
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.orderConnection;
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
      query OrderConnectionQuery($count: Int!, $cursor: String, $filter: FilterFindManyOrderInput) {
        viewer {
          ...OrderConnection_viewer
        }
      }
    `,
  }
);
