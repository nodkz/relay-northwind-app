import Relay from 'react-relay';
import RelayNetworkDebug from 'react-relay/lib/RelayNetworkDebug';
import { hashHistory } from 'react-router';

Relay.injectNetworkLayer(
  // new Relay.DefaultNetworkLayer('http://graphql-compose.herokuapp.com/northwind/')
  new Relay.DefaultNetworkLayer('http://localhost:3333/northwind/')
);

if (process.env.NODE_ENV === 'development' || __DEV__) {
  RelayNetworkDebug.init();
}

export const relayStore = Relay.Store;

export {
  hashHistory
};
