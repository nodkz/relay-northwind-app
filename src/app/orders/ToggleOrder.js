/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Order from './Order';
import type { ToggleOrderQueryResponse } from './__generated__/ToggleOrderQuery.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?ToggleOrderQueryResponse,
};

export default class ToggleOrder extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    data: null,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.data) {
      relayStore
        .fetch({
          query: graphql`
            query ToggleOrderQuery($filter: FilterFindOneOrderInput) {
              viewer {
                order(filter: $filter) {
                  ...Order_order
                }
              }
            }
          `,
          variables: { filter: { orderID: this.props.id } },
        })
        .then(res => {
          this.setState({ data: res.order });
        });
    }
  };

  render() {
    return (
      <span>
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          data-id={this.props.id}
          children={this.state.isOpen ? 'close' : 'open'}
        />
        {this.state.isOpen &&
          (this.state.data ? (
            <div className="lrspace bspace">
              <Order order={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
