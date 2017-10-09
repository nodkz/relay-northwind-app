/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import { Well } from 'react-bootstrap';
import ConnectionLoadMore from 'components/ConnectionLoadMore';
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
  onFormFilter = (filter: Object) => {
    this.props.relay.setVariables({ filter });
  };

  render() {
    const { hideFilter, relay } = this.props;
    const { orderConnection } = this.props.viewer;

    if (!orderConnection) {
      return <div>empty order list</div>;
    }

    return (
      <ConnectionLoadMore
        connection={orderConnection}
        relay={relay}
        style={{ marginBottom: hideFilter ? '20px' : '200px' }}
        perPage={PER_PAGE}
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
      </ConnectionLoadMore>
    );
  }
}

export const query = graphql`
  query OrderConnectionQuery($count: Int!, $cursor: String, $filter: FilterFindManyOrderInput) {
    viewer {
      ...OrderConnection_viewer
    }
  }
`;

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
      return { count, cursor, filter: filter || fragmentVariables.filter };
    },
    query,
  }
);
