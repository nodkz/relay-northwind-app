/* @flow */

import * as React from 'react';
import Relay from 'react-relay/classic';
import { relayStore } from './clientStores';

import BrokenPage from './components/BrokenPage';
import LoadingPage from './components/LoadingPage';

class ViewerRelayQuery extends Relay.Route {
  static routeName = 'Viewer';
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
}

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
