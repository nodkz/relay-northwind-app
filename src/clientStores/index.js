/* @flow */

import createClientStores from './init';

const stores = createClientStores();

export default stores;

const { relayStore } = stores;

export { relayStore };
