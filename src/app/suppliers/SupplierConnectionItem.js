/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from 'react-loading';
import Supplier from './Supplier';
import { relayStore } from '../../clientStores';
import type { SupplierConnectionItem_supplier } from './__generated__/SupplierConnectionItemQuery.graphql';

type Props = {
  supplier: SupplierConnectionItem_supplier,
  relay: any,
};

type State = {
  isOpen: boolean,
  additionalData: any,
};

class SupplierConnectionItem extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    additionalData: null,
  };

  openClose = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.additionalData) {
      relayStore
        .fetch({
          query: graphql`
            query SupplierConnectionItemQuery($id: ID!) {
              node(id: $id) {
                ...Supplier_supplier
              }
            }
          `,
          variables: {
            id: this.props.supplier.id,
          },
        })
        .then(res => {
          this.setState({
            additionalData: res.node,
          });
        });
    }
  };

  render() {
    const { supplier } = this.props;
    const { isOpen } = this.state;

    if (!supplier) {
      return <div>Supplier does not found</div>;
    }

    return (
      <div>
        <div
          onClick={this.openClose}
          style={{ cursor: 'pointer' }}
          className={['row', 'bgOnHover', isOpen ? 'bg-primary' : ''].join(' ')}
        >
          <div className="col-sm-1">{supplier.supplierID}</div>
          <div className="col-sm-3">
            <b>{supplier.companyName}</b>
          </div>
          <div className="col-sm-2">{supplier.contactName}</div>
          <div className="col-sm-2">{supplier.contactTitle}</div>
          <div className="col-sm-1">
            <Button bsSize="xsmall" bsStyle="info">
              {isOpen ? 'Close' : 'Open'}
            </Button>
          </div>
        </div>
        {isOpen &&
          (this.state.additionalData ? (
            <div className="lrspace bspace">
              <Supplier supplier={this.state.additionalData} />
            </div>
          ) : (
            <Loading type="bubbles" color="#3385b5" />
          ))}
      </div>
    );
  }
}

export default createFragmentContainer(
  SupplierConnectionItem,
  graphql`
    fragment SupplierConnectionItem_supplier on Supplier {
      id
      supplierID
      companyName
      contactName
      contactTitle
    }
  `
);
