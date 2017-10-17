/* @flow */

import * as React from 'react';
import Loading from 'components/Loading';

type Props = {
  children: React.Node,
  connection: {
    +pageInfo: {
      +hasNextPage: boolean,
    },
  },
  relay: {
    hasMore: Function,
    isLoading: Function,
    loadMore: Function,
  },
  perPage: number,
  style?: Object,
};

export default class ConnectionLoadMore extends React.Component<Props> {
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
    const { relay, perPage } = this.props;

    if (!relay.hasMore() || relay.isLoading()) return;

    relay.loadMore(perPage, () => {
      this.forceUpdate(); // for hidding loader
    });
    this.forceUpdate(); // for showing loader
  }

  render() {
    const { connection, children, style } = this.props;

    return (
      <div onScroll={this.onScroll} ref={c => (this.scrollContainer = c)} style={style}>
        {children}

        {connection.pageInfo.hasNextPage && <Loading />}
      </div>
    );
  }
}
