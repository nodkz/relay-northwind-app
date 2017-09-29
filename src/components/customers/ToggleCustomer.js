/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from '../Loading';
import { relayStore } from '../../clientStores';
import Customer from './Customer';
import type { ToggleCustomerQueryResponse } from './__generated__/ToggleCustomerQuery.graphql';

type Props = {
  id: string,
};

type State = {
  isOpen: boolean,
  data: ?ToggleCustomerQueryResponse,
};

export default class ToggleCustomer extends React.Component<Props, State> {
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
            query ToggleCustomerQuery($filter: FilterFindOneCustomerInput) {
              viewer {
                customer(filter: $filter) {
                  ...Customer_customer
                }
              }
            }
          `,
          variables: {
            filter: {
              customerID: this.props.id,
            },
          },
        })
        .then(res => {
          this.setState({
            data: res.customer,
          });
        });
    }
  };

  render() {
    return (
      <span>
        {' '}
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
              <Customer customer={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
