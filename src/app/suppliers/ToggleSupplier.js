/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Supplier from './Supplier';
import type { ToggleSupplierQueryResponse } from './__generated__/ToggleSupplierQuery.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?ToggleSupplierQueryResponse,
};

export default class ToggleSupplier extends React.Component<Props, State> {
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
            query ToggleSupplierQuery($filter: FilterFindOneSupplierInput) {
              viewer {
                supplier(filter: $filter) {
                  ...Supplier_supplier
                }
              }
            }
          `,
          variables: { filter: { supplierID: this.props.id } },
        })
        .then(res => {
          this.setState({ data: res.supplier });
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
              <Supplier supplier={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
