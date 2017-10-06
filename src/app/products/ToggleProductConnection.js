/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import ProductConnection from './ProductConnection';
import type { ToggleProductConnectionQueryResponse } from './__generated__/ToggleProductConnectionQuery.graphql';

type Props = {
  filter: Object,
};

type State = {
  isOpen: boolean,
  viewer: ?ToggleProductConnectionQueryResponse,
};

export default class ToggleProductConnection extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    viewer: null,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.viewer) {
      relayStore
        .fetch({
          query: graphql`
            query ToggleProductConnectionQuery($filter: FilterFindManyProductInput) {
              viewer {
                ...ProductConnection_viewer
              }
            }
          `,
          variables: { filter: this.props.filter },
        })
        .then(res => {
          this.setState({ viewer: res });
        });
    }
  };

  render() {
    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={this.toggle}
          children={this.state.isOpen ? 'hide all' : 'show all'}
        />
        {this.state.isOpen &&
          (this.state.viewer ? (
            <div className="lrspace bspace bordered">
              <ProductConnection hideFilter viewer={this.state.viewer} filter={this.props.filter} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
