/* @flow */

import * as React from 'react';
import Relay from 'react-relay/classic';
import type { ContextRouter } from 'react-router';
import { relayStore } from 'clientStores';
import BrokenPage from './BrokenPage';
import LoadingPage from './LoadingPage';

// class ViewerRelayQuery extends Relay.Route {
//   static routeName = 'Viewer';
//   static queries = {
//     viewer: () => Relay.QL`query { viewer }`,
//   };
// }

type LoaderOpts = {
  query?: () => any,
  variables?: (routeProps: ContextRouter) => Object,
};

export default function relayLoader(component: React$ComponentType<any>, opts: LoaderOpts = {}) {
  const RelayRenderer = Relay.Renderer;
  return (routeProps: ContextRouter) => {
    return (
      <RelayRenderer
        Container={component}
        environment={relayStore}
        queryConfig={// new ViewerRelayQuery(prepareVars ? prepareVars(routeProps) : {})
        {
          queries: { viewer: opts.query || (() => Relay.QL`query { viewer }`) },
          params: !opts.variables
            ? {}
            : opts.variables.call ? opts.variables(routeProps) : opts.variables,
          name: component.name,
        }}
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
