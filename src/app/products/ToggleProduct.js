/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Product from './Product';
import type { ToggleProductQueryResponse } from './__generated__/ToggleProductQuery.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?ToggleProductQueryResponse,
};

export default class ToggleProduct extends React.Component<Props, State> {
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
            query ToggleProductQuery($filter: FilterFindOneProductInput) {
              viewer {
                product(filter: $filter) {
                  ...Product_product
                }
              }
            }
          `,
          variables: { filter: { productID: this.props.id } },
        })
        .then(res => {
          this.setState({ data: res.product });
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
              <Product product={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
