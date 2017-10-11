/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import ConnectionLoadMore from 'components/ConnectionLoadMore';
import SupplierConnectionItem from './SupplierConnectionItem';
import type { SupplierConnection_viewer } from './__generated__/SupplierConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {
  viewer: SupplierConnection_viewer,
  relay: Object,
};

class SupplierConnection extends React.Component<Props> {
  render() {
    const { viewer, relay } = this.props;
    const { supplierConnection } = viewer || {};

    if (!supplierConnection) return 'no suppliers found';

    return (
      <ConnectionLoadMore
        connection={supplierConnection}
        relay={relay}
        style={{ marginBottom: '200px' }}
        perPage={PER_PAGE}
      >
        <h3>Total {supplierConnection.count} records</h3>

        {supplierConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <SupplierConnectionItem supplier={node} />
            </div>
          );
        })}
      </ConnectionLoadMore>
    );
  }
}

export const query = graphql`
  query SupplierConnectionQuery($count: Int!, $cursor: String) {
    viewer {
      ...SupplierConnection_viewer
    }
  }
`;

export default createPaginationContainer(
  SupplierConnection,
  graphql`
    fragment SupplierConnection_viewer on Viewer {
      supplierConnection(first: $count, after: $cursor)
        @connection(key: "SupplierConnection_supplierConnection") {
        count
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          cursor
          node {
            _id
            ...SupplierConnectionItem_supplier
          }
        }
      }
    }
  `,
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.supplierConnection;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return { count, cursor };
    },
    query,
  }
);
