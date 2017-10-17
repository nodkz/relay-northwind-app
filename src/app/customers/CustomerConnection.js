/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay';
import ConnectionLoadMore from 'components/ConnectionLoadMore';
import CustomerConnectionItem from './CustomerConnectionItem';
import type { CustomerConnection_viewer } from './__generated__/CustomerConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {
  viewer: CustomerConnection_viewer,
  relay: Object,
};

class CustomerConnection extends React.Component<Props> {
  render() {
    const { viewer, relay } = this.props;
    const { customerConnection } = viewer || {};

    if (!customerConnection) return 'no customers found';

    return (
      <ConnectionLoadMore
        connection={customerConnection}
        relay={relay}
        style={{ marginBottom: '200px' }}
        perPage={PER_PAGE}
      >
        <div>
          <h3>Total {customerConnection.count} records</h3>

          <div className="row">
            <div className="col-sm-1">
              <b>CutomerID</b>
            </div>
            <div className="col-sm-2">
              <b>Company name</b>
            </div>
            <div className="col-sm-2">
              <b>Contact name</b>
            </div>
            <div className="col-sm-2">
              <b>Contact title</b>
            </div>
            <div className="col-sm-2">
              <b>Address</b>
            </div>
            <div className="col-sm-2">
              <b>Total orders</b>
            </div>
          </div>
          <hr />
        </div>

        {customerConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <CustomerConnectionItem customer={node} />
            </div>
          );
        })}
      </ConnectionLoadMore>
    );
  }
}

export const query = graphql`
  query CustomerConnectionQuery($count: Int!, $cursor: String) {
    viewer {
      ...CustomerConnection_viewer
    }
  }
`;

export default createPaginationContainer(
  CustomerConnection,
  graphql`
    fragment CustomerConnection_viewer on Viewer {
      customerConnection(first: $count, after: $cursor)
        @connection(key: "CustomerConnection_customerConnection") {
        count
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            _id
            ...CustomerConnectionItem_customer
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor };
    },
    query,
  }
);
