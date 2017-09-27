import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from 'react-loading';
import Supplier from './Supplier';
import { relayStore } from '../../clientStores';

class SupplierConnectionItem extends React.Component {
  static propTypes = {
    supplier: PropTypes.object,
    relay: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      additionalData: null,
    };

    this.openClose = this.openClose.bind(this);
  }

  openClose() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.additionalData) {
      const query = Relay.createQuery(
        Relay.QL`query {
          node(id:$id) {
            ${Supplier.getFragment('supplier')}
          }
        }`,
        { id: this.props.supplier.id }
      );
      relayStore.primeCache({ query }, readyState => {
        if (readyState.done) {
          const data = relayStore.readQuery(query)[0];
          this.setState({ additionalData: data });
        }
      });
    }
  }

  render() {
    const { supplier = {} } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <div
          onClick={this.openClose}
          style={{ cursor: 'pointer' }}
          className={['row', 'bgOnHover', isOpen ? 'bg-primary' : ''].join(' ')}
        >
          <div className="col-sm-1">{supplier.supplierID}</div>
          <div className="col-sm-3"><b>{supplier.companyName}</b></div>
          <div className="col-sm-2">{supplier.contactName}</div>
          <div className="col-sm-2">{supplier.contactTitle}</div>
          <div className="col-sm-1">
            <Button bsSize="xsmall" bsStyle="info">
              { isOpen ? 'Close' : 'Open' }
            </Button>
          </div>
        </div>
        { isOpen && (
          this.state.additionalData
          ? <div className="lrspace bspace">
            <Supplier supplier={this.state.additionalData} />
          </div>
          : <Loading type="bubbles" color="#3385b5" />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(SupplierConnectionItem, {
  fragments: {
    supplier: () => Relay.QL`
      fragment on Supplier {
        id
        supplierID
        companyName
        contactName
        contactTitle
      }
    `,
  },
});
