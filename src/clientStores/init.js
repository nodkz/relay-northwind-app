/* @flow */

import RelayStore from './RelayStore';

declare class StoresClass {
  relayStore: RelayStore,
}

export type StoresT = StoresClass;

export default function createClientStores(): StoresT {
  // $FlowFixMe
  const stores: StoresT = {};

  stores.relayStore = new RelayStore(stores);

  if (typeof window !== 'undefined') {
    window.stores = stores;
  }

  return stores;
}
