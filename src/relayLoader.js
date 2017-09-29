import * as React from 'react';
import Relay from 'react-relay/classic';
import RelayStore from './RelayStore';

import BrokenPage from './components/BrokenPage';
import LoadingPage from './components/LoadingPage';

class ViewerRelayQuery extends Relay.Route {
  static routeName = 'Viewer';
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
}

// This variable will be replaced at build process by webpack
//    see webpack.DefinePlugin in /tools/webpack.config.commons.js
// By default `https://graphql-compose.herokuapp.com/northwind/`
// But may be overrided locally via .env file
const endpoint = process.env.RELAY_ENDPOINT;

export const relayStore = new RelayStore({ endpoint });

export default function relayLoader(component) {
  const RelayRenderer = Relay.Renderer;
  return routeProps => {
    return (
      <RelayRenderer
        Container={component}
        environment={relayStore}
        queryConfig={new ViewerRelayQuery()}
        render={({ error, props }) => {
          if (error) {
            return <BrokenPage message={error.message} />;
          } else if (props) {
            return React.createElement(component, {
              ...routeProps,
              ...props,
            });
          }
          return <LoadingPage />;
        }}
      />
    );
  };
}
