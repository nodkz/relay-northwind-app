/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import Loading from 'components/Loading';
import SupplierConnectionItem from './SupplierConnectionItem';
import type { SupplierConnection_viewer } from './__generated__/SupplierConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {
  viewer: SupplierConnection_viewer,
  relay: Object,
};

class SupplierConnection extends React.Component<Props> {
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

  render() {
    const { viewer, relay } = this.props;
    const { supplierConnection } = viewer || {};

    if (!supplierConnection) return 'no suppliers found';

    return (
      <div
        onScroll={this.onScroll}
        ref={c => (this.scrollContainer = c)}
        style={{ marginBottom: '200px' }}
      >
        <h3>Total {supplierConnection.count} records</h3>

        {supplierConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <SupplierConnectionItem supplier={node} />
            </div>
          );
        })}

        {relay.isLoading() && <Loading />}
      </div>
    );
  }
}

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
    query: graphql`
      query SupplierConnectionQuery($count: Int!, $cursor: String) {
        viewer {
          ...SupplierConnection_viewer
        }
      }
    `,
  }
);
