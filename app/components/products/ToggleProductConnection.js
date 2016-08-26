import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from '../Loading';
import { relayStore } from '../../clientStores';
import ProductConnection from './ProductConnection';

export default class ToggleProductConnection extends React.Component {
  static propTypes = {
    filter: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      viewer: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.viewer) {
      const query = Relay.createQuery(
        Relay.QL`query {
          viewer {
            ${ProductConnection.getFragment('viewer', { filter: this.props.filter })}
          }
        }`,
        { filter: this.props.filter }
      );
      relayStore.primeCache({ query }, readyState => {
        if (readyState.done) {
          const viewer = relayStore.readQuery(query)[0];
          this.setState({ viewer });
        }
      });
    }
  }

  render() {
    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="danger"
          onClick={this.toggle}
          children={this.state.isOpen ? 'hide all' : 'show all'}
        />
        { this.state.isOpen && (
          this.state.viewer
          ? <div className="lrspace bspace bordered">
            <ProductConnection
              hideFilter
              viewer={this.state.viewer}
              filter={this.props.filter}
            />
          </div>
          : <Loading />
        )}
      </span>
    );
  }
}
