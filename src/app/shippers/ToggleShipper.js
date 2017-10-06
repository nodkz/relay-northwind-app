/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Shipper from './Shipper';
import type { ToggleShipperQueryResponse } from './__generated__/ToggleShipperQuery.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?ToggleShipperQueryResponse,
};

export default class ToggleShipper extends React.Component<Props, State> {
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
            query ToggleShipperQuery($filter: FilterFindOneShipperInput) {
              viewer {
                shipper(filter: $filter) {
                  ...Shipper_shipper
                }
              }
            }
          `,
          variables: { filter: { shipperID: this.props.id } },
        })
        .then(res => {
          this.setState({ data: res.shipper });
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
              <Shipper shipper={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
