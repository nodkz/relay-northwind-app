/* @flow */

import * as React from 'react';
import { QueryRenderer } from 'react-relay/compat';
import type { ContextRouter } from 'react-router';
import { relayStore } from 'clientStores';
import BrokenPage from './BrokenPage';
import LoadingPage from './LoadingPage';

type LoaderOpts = {
  query?: () => any,
  variables?: (routeProps: ContextRouter) => Object,
};

export default function relayLoader(component: React$ComponentType<any>, opts: LoaderOpts = {}) {
  return (routeProps: ContextRouter) => {
    return (
      <QueryRenderer
        Container={component}
        environment={relayStore}
        query={opts.query}
        variables={
          !opts.variables ? {} : opts.variables.call ? opts.variables(routeProps) : opts.variables
        }
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
