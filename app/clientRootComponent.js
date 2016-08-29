import React, { Component, PropTypes } from 'react';
import { Router, applyRouterMiddleware } from 'react-router';
import useRelay from 'react-router-relay';
import routes from './routes';

// ////////////////////////////////////////////////////////////
// This component is required for react-hot-loader@3.0.0-beta.1
// ////////////////////////////////////////////////////////////

export default class ClientRoot extends Component { // eslint-disable-line
  static propTypes = {
    environment: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { environment, history } = this.props;

    return (
      <Router
        routes={routes}
        history={history}
        // `.default` problem explained here https://github.com/relay-tools/react-router-relay/issues/192
        render={applyRouterMiddleware(useRelay.default ? useRelay.default : useRelay)} // eslint-disable-line
        environment={environment}
      />
		);
  }
}
