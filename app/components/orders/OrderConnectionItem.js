import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from 'react-loading';
import Order from './Order';
import { relayStore } from '../../clientStores';

class OrderConnectionItem extends React.Component {
  static propTypes = {
    order: PropTypes.object,
    viewer: PropTypes.object,
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
            ${Order.getFragment('order')}
          }
        }`,
        { id: this.props.order.id }
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
    const { order = {} } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <div
          onClick={this.openClose}
          style={{ cursor: 'pointer' }}
          className={['row', 'bgOnHover', isOpen ? 'bg-primary' : ''].join(' ')}
        >
          <div className="col-sm-1">{order.orderID}</div>
          <div className="col-sm-3">{order.shipName}</div>
          <div className="col-sm-2">{`${order.orderDate}`.substr(0, 10)}</div>
          <div className="col-sm-2">{order.freight}</div>
          <div className="col-sm-2">
            <Button bsSize="xsmall">
              { isOpen ? 'Close' : 'Open' }
            </Button>
          </div>
        </div>
        { isOpen && (
          this.state.additionalData
          ? <div className="lrspace bspace">
            <Order order={this.state.additionalData} />
          </div>
          : <Loading type="bubbles" color="#3385b5" />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(OrderConnectionItem, {
  fragments: {
    order: () => Relay.QL`
      fragment on Order {
        id
        orderID
        shipName
        orderDate
        freight
      }
    `,
  },
});
