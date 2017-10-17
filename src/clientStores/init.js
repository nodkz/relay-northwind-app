/* @flow */

import RelayStore from './RelayStore';
import AlertStore from './AlertStore';
import ErrorCatcher from './ErrorCatcher';

declare class StoresClass {
  relayStore: RelayStore;
  alertStore: AlertStore;
  errorCatcher: ErrorCatcher;
}

export type StoresT = StoresClass;

export default function createClientStores(): StoresT {
  // $FlowFixMe
  const stores: StoresT = {};

  stores.errorCatcher = new ErrorCatcher(stores);
  stores.relayStore = new RelayStore(stores);
  stores.alertStore = new AlertStore();

  if (typeof window !== 'undefined') {
    window.stores = stores;
  }

  return stores;
}
