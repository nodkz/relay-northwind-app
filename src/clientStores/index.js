/* @flow */

import createClientStores from './init';

const stores = createClientStores();

export default stores;

const { relayStore, alertStore, errorCatcher } = stores;

export { relayStore, alertStore, errorCatcher };
