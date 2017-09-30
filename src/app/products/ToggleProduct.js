import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Product from './Product';

export default class ToggleProduct extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.data) {
      relayStore
        .fetch({
          query: Relay.QL`query {
          viewer {
            product(filter: $filter) {
              ${Product.getFragment('product')}
            }
          }
        }`,
          variables: { filter: { productID: this.props.id } },
        })
        .then(res => {
          this.setState({ data: res.product });
        });
    }
  }

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
