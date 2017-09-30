import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
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
      relayStore
        .fetch({
          query: Relay.QL`query {
          viewer {
            ${ProductConnection.getFragment('viewer', { filter: this.props.filter })}
          }
        }`,
          variables: { filter: this.props.filter },
        })
        .then(res => {
          this.setState({ viewer: res });
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
        {this.state.isOpen &&
          (this.state.viewer ? (
            <div className="lrspace bspace bordered">
              <ProductConnection hideFilter viewer={this.state.viewer} filter={this.props.filter} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
