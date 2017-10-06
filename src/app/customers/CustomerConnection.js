/* @flow */

import React from 'react';
import { createPaginationContainer, graphql } from 'react-relay/compat';
import Loading from 'components/Loading';
import CustomerConnectionItem from './CustomerConnectionItem';
import type { CustomerConnection_viewer } from './__generated__/CustomerConnection_viewer.graphql';

const PER_PAGE = 10;

type Props = {
  viewer: CustomerConnection_viewer,
  relay: Object,
};

class CustomerConnection extends React.Component<Props> {
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
    const { customerConnection } = viewer || {};

    if (!customerConnection) return 'no customers found';

    return (
      <div
        onScroll={this.onScroll}
        ref={c => (this.scrollContainer = c)}
        style={{ marginBottom: '200px' }}
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

        {relay.isLoading() && <Loading />}
      </div>
    );
  }
}

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
    getConnectionFromProps(props) {
      return props.viewer && props.viewer.customerConnection;
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
      query CustomerConnectionQuery($count: Int!, $cursor: String) {
        viewer {
          ...CustomerConnection_viewer
        }
      }
    `,
  }
);
