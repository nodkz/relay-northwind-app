import Relay from 'react-relay';
import RelayNetworkDebug from 'react-relay/lib/RelayNetworkDebug';
import { hashHistory } from 'react-router';

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('https://graphql-compose.herokuapp.com/northwind/')
  // new Relay.DefaultNetworkLayer('http://localhost:3333/northwind/')
);

// DISABLE network debug in your production!
// This is demo app, so debug is part of demo :P
// if (process.env.NODE_ENV === 'development' || __DEV__) {
RelayNetworkDebug.init();
// }

export const relayStore = Relay.Store;

export {
  hashHistory,
};
