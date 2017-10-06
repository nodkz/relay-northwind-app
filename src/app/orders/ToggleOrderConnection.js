/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import OrderConnection from './OrderConnection';
import type { ToggleOrderConnectionQueryResponse } from './__generated__/ToggleOrderConnectionQuery.graphql';

type Props = {
  filter: Object,
};

type State = {
  isOpen: boolean,
  viewer: ?ToggleOrderConnectionQueryResponse,
};

export default class ToggleOrderConnection extends React.Component<Props, State> {
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
            query ToggleOrderConnectionQuery($filter: FilterFindManyOrderInput) {
              viewer {
                ...OrderConnection_viewer
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
    const { viewer, isOpen } = this.state;
    const { filter } = this.props;

    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={this.toggle}
          children={isOpen ? 'hide all' : 'show all'}
        />
        {isOpen &&
          (viewer ? (
            <div className="lrspace bspace bordered">
              <OrderConnection hideFilter viewer={viewer} filter={filter} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
