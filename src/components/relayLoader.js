/* @flow */

import * as React from 'react';
import Relay from 'react-relay/classic';
import type { ContextRouter } from 'react-router';
import { relayStore } from 'clientStores';
import BrokenPage from './BrokenPage';
import LoadingPage from './LoadingPage';

class ViewerRelayQuery extends Relay.Route {
  static routeName = 'Viewer';
  static queries = {
    viewer: () => Relay.QL`query { viewer }`,
  };
}

export default function relayLoader(component: React$ComponentType<any>) {
  const RelayRenderer = Relay.Renderer;
  return (routeProps: ContextRouter) => {
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
