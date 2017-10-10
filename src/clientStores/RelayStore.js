/* @flow */
/* eslint-disable no-use-before-define */

import * as React from 'react';
import Relay from 'react-relay/classic';
import { commitMutation } from 'react-relay/compat';
import RelayNetworkDebug from 'react-relay/lib/RelayNetworkDebug';
import {
  RelayNetworkLayer,
  urlMiddleware,
  loggerMiddleware,
  retryMiddleware,
  gqErrorsMiddleware,
  // batchMiddleware,
  // perfMiddleware,
} from 'react-relay-network-layer';

// This variable will be replaced at build process by webpack
//    see webpack.DefinePlugin in /tools/webpack.config.commons.js
// But may be overrided locally via .env file
const endpoint: string =
  process.env.RELAY_ENDPOINT || 'https://graphql-compose.herokuapp.com/northwind/';

type AlertData = any;
type AlertStatusType = any;
type StoresT = any;

export type AlertOptsT = string | boolean | $Shape<AlertData>;

export type RelayFetchOpts = {
  query: any,
  force?: boolean,
  variables?: { [key: string]: any },
  onSuccess?: (result: *) => void,
  onSuccessAlert?: AlertOptsT,
  onError?: (err: Error) => void,
  onErrorAlert?: AlertOptsT,
  onStart?: () => void,
  onStartAlert?: AlertOptsT,
  onEnd?: () => void,
  onEndAlert?: AlertOptsT,
};

export type RelayMutateOpts = {
  query: any,
  variables?: mixed,
  collisionKey?: string,
  configs?: mixed,
  onSuccess?: (payload: any) => void, // MAYBE SHOULD BE result???
  onSuccessAlert?: AlertOptsT,
  onError?: (err: Error, transaction: mixed) => void,
  onErrorAlert?: AlertOptsT,
  onStart?: () => void,
  onStartAlert?: AlertOptsT,
  onEnd?: () => void,
  onEndAlert?: AlertOptsT,
  optimisticQuery?: mixed,
  optimisticResponse?: mixed,
  optimisticConfigs?: mixed,
};

export default class RelayStore {
  _stores: StoresT;
  _relayEnv: *;
  _onResetCb: Function;
  endpoint: string = endpoint;
  unstable_internal: any; // Relay Compat

  constructor(stores: StoresT) {
    this._stores = stores;
    this._createRelayEnv();
  }

  _createRelayEnv() {
    this._relayEnv = new Relay.Environment();
    this._relayEnv.injectNetworkLayer(this._createRelayNetworkLayer());
    // this._relayEnv.injectTaskScheduler((task) => {
    //   setTimeout(task, 0);
    // });
    if (__DEV__) {
      RelayNetworkDebug.init(this._relayEnv);
    }

    this.unstable_internal = this._relayEnv.unstable_internal; // Relay Compat
  }

  reset(): void {
    this._createRelayEnv();
    if (this._onResetCb) {
      this._onResetCb();
    }
  }

  onReset(cb: Function) {
    this._onResetCb = cb;
  }

  fetch(opts: RelayFetchOpts): Promise<*> {
    const { query } = opts;
    if (query.classic || query.modern) {
      return this.fetchModern(opts);
    }
    return this.fetchClassic(opts);
  }

  fetchClassic({
    query,
    force = false,
    variables,
    onSuccess,
    onSuccessAlert,
    onError,
    onErrorAlert,
    onStart,
    onStartAlert,
    onEnd,
    onEndAlert,
  }: RelayFetchOpts): Promise<*> {
    return new Promise((resolve, reject) => {
      const alertIdx = Date.now();

      const q = Relay.createQuery(query, variables || {});
      if (onStart) {
        onStart();
      }
      if (onStartAlert) {
        this._showAlert(onStartAlert, 'Loading...', 'info', alertIdx);
      }

      const args = [
        { query: q },
        readyState => {
          if (readyState.error) {
            const err = readyState.error;
            if (onError) onError(err);
            if (onEnd) onEnd();
            reject(readyState.error);

            if (onErrorAlert) {
              this._showAlert(onErrorAlert, `Loading error: ${err}`, 'error', alertIdx);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed', 'info', alertIdx, 2000);
            } else {
              this._hideAlert(alertIdx);
            }
          }
          if (readyState.ready) {
            const result = this._relayEnv.readQuery(q)[0];
            if (onSuccess) onSuccess(result);
            if (onEnd) onEnd();
            resolve(result);

            if (onSuccessAlert) {
              this._showAlert(onSuccessAlert, 'success', 'success', alertIdx, 2000);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed', 'info', alertIdx, 2000);
            } else {
              this._hideAlert(alertIdx);
            }
          }
        },
      ];

      if (force) {
        this._relayEnv.forceFetch(...args);
      } else {
        this._relayEnv.primeCache(...args);
      }
    });
  }

  fetchModern({
    query,
    force = false,
    variables,
    onSuccess,
    onSuccessAlert,
    onError,
    onErrorAlert,
    onStart,
    onStartAlert,
    onEnd,
    onEndAlert,
  }: RelayFetchOpts): Promise<*> {
    return new Promise((resolve, reject) => {
      const alertIdx = Date.now();

      const cacheConfig = force ? { force } : undefined;

      const { createOperationSelector, getOperation } = this._relayEnv.unstable_internal;
      const operation = createOperationSelector(getOperation(query), variables);

      if (onStart) {
        onStart();
      }
      if (onStartAlert) {
        this._showAlert(onStartAlert, 'Loading...', 'info', alertIdx);
      }

      this._relayEnv
        .execute({ operation, cacheConfig })
        .finally(() => {
          if (onEnd) onEnd();
        })
        .subscribe({
          error: err => {
            if (onError) onError(err);
            reject(err);

            if (onErrorAlert) {
              this._showAlert(onErrorAlert, `Loading error: ${err}`, 'error', alertIdx);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed', 'info', alertIdx, 2000);
            } else {
              this._hideAlert(alertIdx);
            }
          },
          next: () => {
            const snapshot = this._relayEnv.lookup(operation.fragment);
            const result = snapshot.data;
            if (onSuccess) onSuccess(result);

            resolve(result);

            if (onSuccessAlert) {
              this._showAlert(onSuccessAlert, 'success', 'success', alertIdx, 2000);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed', 'info', alertIdx, 2000);
            } else {
              this._hideAlert(alertIdx);
            }
          },
        });
    });
  }

  mutate(opts: RelayMutateOpts): Promise<any> {
    const { query } = opts;
    if (query.classic || query.modern) {
      return this.mutateModern(opts);
    }
    // query.kind === 'Mutation'
    return this.mutateClassic(opts);
  }

  mutateClassic({
    query,
    variables,
    collisionKey,
    configs,
    onSuccess,
    onSuccessAlert,
    onError,
    onErrorAlert,
    onStart,
    onStartAlert,
    onEnd,
    onEndAlert,
    optimisticQuery,
    optimisticResponse,
    optimisticConfigs,
  }: RelayMutateOpts): Promise<any> {
    if (onErrorAlert === undefined) onErrorAlert = true; // eslint-disable-line

    return new Promise((resolve, reject) => {
      // see docs https://facebook.github.io/relay/docs/api-reference-relay-graphql-mutation.html#content
      let vars;
      if (!variables) {
        vars = undefined;
      } else if (variables.input) {
        // eslint-disable-line
        vars = variables;
      } else {
        vars = { input: variables };
      }

      let colKey;
      if (collisionKey) {
        colKey = collisionKey;
      } else if (variables) {
        // if _id provided, then take it as collision key
        if (variables._id) {
          colKey = variables._id;
        } else if (variables.record && variables.record._id) {
          colKey = variables.record._id;
        }
      }

      if (!colKey) {
        colKey = 'mutation';
      }

      if (onStart) {
        onStart();
      }
      if (onStartAlert) {
        this._showAlert(onStartAlert, 'Processing...', 'info', colKey);
      }

      const mutation = new Relay.GraphQLMutation(
        query,
        vars,
        null, // I don't use file upload, cause upload by signed url directly to S3
        this._relayEnv,
        {
          onFailure: transaction => {
            const err = this._normalizeRelayTransactionError(transaction);
            if (onError) onError(err, transaction);
            if (onEnd) onEnd();
            reject(err);

            const errMsg = err && err.message ? err.message : err;
            this._stores.errorCatcher.captureMessage('RelayMutationError', {
              extra: {
                variables,
                error: errMsg,
              },
            });

            if (onErrorAlert) {
              this._showAlert(onErrorAlert, 'Error in operation.', 'error', colKey);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed with error', 'info', colKey, 2000);
            } else {
              console.error(err); // eslint-disable-line
              this._hideAlert(colKey);
            }
          },
          onSuccess: response => {
            if (onSuccess) onSuccess(response);
            if (onEnd) onEnd();
            resolve(response);

            if (onSuccessAlert) {
              this._showAlert(onSuccessAlert, 'Success', 'success', colKey, 2000);
            } else if (onEndAlert) {
              this._showAlert(onEndAlert, 'Completed', 'info', colKey, 2000);
            } else {
              this._hideAlert(colKey);
            }
          },
        },
        colKey
      );

      if (optimisticResponse) {
        mutation.applyOptimistic(
          optimisticQuery || query, // if optimisticQuery not provided, then take query
          optimisticResponse,
          optimisticConfigs || configs
        );
      }

      // we can get transaction here but no need, cause callbacks already defined in constructor
      mutation.commit(configs);
    });
  }

  mutateModern({
    query,
    variables,
    collisionKey,
    configs,
    onSuccess,
    onSuccessAlert,
    onError,
    onErrorAlert,
    onStart,
    onStartAlert,
    onEnd,
    onEndAlert,
    optimisticQuery,
    optimisticResponse,
    optimisticConfigs,
  }: RelayMutateOpts): Promise<any> {
    if (onErrorAlert === undefined) onErrorAlert = true; // eslint-disable-line

    return new Promise((resolve, reject) => {
      // see docs https://facebook.github.io/relay/docs/api-reference-relay-graphql-mutation.html#content
      let vars;
      if (!variables) {
        vars = undefined;
      } else if (variables.input) {
        // eslint-disable-line
        vars = variables;
      } else {
        vars = { input: variables };
      }

      let colKey;
      if (collisionKey) {
        colKey = collisionKey;
      } else if (variables) {
        // if _id provided, then take it as collision key
        if (variables._id) {
          colKey = variables._id;
        } else if (variables.record && variables.record._id) {
          colKey = variables.record._id;
        }
      }

      if (!colKey) {
        colKey = 'mutation';
      }

      if (onStart) {
        onStart();
      }
      if (onStartAlert) {
        this._showAlert(onStartAlert, 'Processing...', 'info', colKey);
      }

      const handleError = (err: Error) => {
        if (onError) onError(err);
        if (onEnd) onEnd();
        reject(err);

        const errMsg = err && err.message ? err.message : err;

        this._stores.errorCatcher.captureMessage('RelayMutationError', {
          extra: {
            variables,
            error: errMsg,
          },
        });

        if (onErrorAlert) {
          this._showAlert(onErrorAlert, 'Error in operation.', 'error', colKey);
        } else if (onEndAlert) {
          this._showAlert(onEndAlert, 'Completed with error', 'info', colKey, 2000);
        } else {
          console.error(err); // eslint-disable-line
          this._hideAlert(colKey);
        }
      };

      commitMutation(this._relayEnv, {
        mutation: query,
        variables: vars,
        // uploadables?: UploadableMap,
        // updater?: ?SelectorStoreUpdater,
        // optimisticUpdater?: ?SelectorStoreUpdater,
        optimisticResponse,
        onCompleted: (response: ?Object, errors: ?[Error]) => {
          if (errors) {
            const err = this._normalizeRelayPayloadErrors(errors);
            handleError(err);
            return;
          }

          if (onSuccess) onSuccess(response);
          if (onEnd) onEnd();
          resolve(response);

          if (onSuccessAlert) {
            this._showAlert(onSuccessAlert, 'Success', 'success', colKey, 2000);
          } else if (onEndAlert) {
            this._showAlert(onEndAlert, 'Completed', 'info', colKey, 2000);
          } else {
            this._hideAlert(colKey);
          }
        },
        onError: (err: Error) => {
          handleError(err);
        },
      });
    });
  }

  _createRelayNetworkLayer() {
    return new RelayNetworkLayer(
      [
        // batchMiddleware({
        //   batchUrl: '/graphql/batch',
        //   batchTimeout: 20,
        // }),
        urlMiddleware({
          url: this.endpoint,
        }),
        __DEV__ ? loggerMiddleware() : null,
        // __DEV__ ? perfMiddleware() : null,
        !__DEV__
          ? retryMiddleware({
              // [3200, 6400, 12800, 25600, 51200, 102400, 204800, 409600, ...],
              retryDelays: attempt => 2 ** (attempt + 4) * 100,
              forceRetry: (cb, delay) => {
                window.forceRelayRetry = cb;
                // eslint-disable-next-line
                console.log(`call 'forceRelayRetry()' for immediately retry! Or wait ${delay} ms.`);
              },
            })
          : null,
        __DEV__ ? gqErrorsMiddleware() : null,
      ].filter(o => !!o)
    );
  }

  _normalizeRelayPayloadErrors(errors: any): Error {
    const messages = [];
    if (Array.isArray(errors)) {
      errors.forEach(item => {
        messages.push(item.message ? item.message : item.toString());
      });
    } else {
      messages.push(JSON.stringify(errors));
    }
    return new Error(messages.join(' \n\n'));
  }

  // Relay Classic
  _normalizeRelayTransactionError(transaction: *) {
    const some = transaction.getError();
    if (some instanceof Error) {
      return some;
    }
    if (some.json && some.json.errors) {
      return this._normalizeRelayPayloadErrors(some.json.errors);
    }
    if (some.status && some.statusText) {
      return new Error(`${some.status} ${some.statusText}`);
    }
    console.dir(some, { depth: 3 }); // eslint-disable-line
    return new Error(`RelayStrangeError: ${some} (see console.log for more details)`);
  }

  _showAlert(
    alertForceOpts: AlertOptsT,
    msg: React.Node,
    type: AlertStatusType,
    idx: any,
    autoClose?: number
  ) {
    if (alertForceOpts) {
      let alertOpts;
      if (alertForceOpts === true) {
        alertOpts = {}; // eslint-disable-line
      } else if (typeof alertForceOpts === 'string') {
        alertOpts = { msg: alertForceOpts }; // eslint-disable-line
      }

      this._stores.alertStore.add({
        msg,
        idx,
        type,
        autoClose,
        ...alertOpts,
      });
    }
  }

  _hideAlert(idx: any) {
    this._stores.alertStore.del(idx);
  }

  /**
   * RELAY METHODS
   */
  applyMutation(opts: *) {
    return this._relayEnv.applyMutation(opts);
  }

  commitPayload(operationSelector: *, payload: *) {
    return this._relayEnv.commitPayload(operationSelector, payload);
  }

  _lookup(selector: *) {
    return this._relayEnv._lookup(selector);
  }

  lookup(selector: *) {
    return this._relayEnv.lookup(selector);
  }

  sendMutation(opts: *) {
    return this._relayEnv.sendMutation(opts);
  }

  subscribe(snapshot: *, callback: *) {
    return this._relayEnv.subscribe(snapshot, callback);
  }

  execute(operation: *, cacheConfig: *, updater: *) {
    return this._relayEnv.execute(operation, cacheConfig, updater);
  }

  retain(selector: *) {
    return this._relayEnv.retain(selector);
  }

  sendQuery(opts: *) {
    return this._relayEnv.sendQuery(opts);
  }

  streamQuery(config: *) {
    return this._relayEnv.streamQuery(config);
  }

  applyUpdate(mutation: *, callbacks: *) {
    return this._relayEnv.applyUpdate(mutation, callbacks);
  }

  commitUpdate(mutation: *, callbacks: *) {
    return this._relayEnv.commitUpdate(mutation, callbacks);
  }

  getStoreData(): any {
    return this._relayEnv.getStoreData();
  }

  injectDefaultNetworkLayer(networkLayer: any) {
    this._relayEnv.injectDefaultNetworkLayer(networkLayer);
  }

  injectNetworkLayer(networkLayer: any) {
    this._relayEnv.injectNetworkLayern(networkLayer);
  }

  injectQueryTracker(queryTracker: any) {
    this._relayEnv.injectQueryTracker(queryTracker);
  }

  addNetworkSubscriber(queryCallback?: any, mutationCallback?: any): any {
    return this._relayEnv.addNetworkSubscriber(queryCallback, mutationCallback);
  }

  injectTaskScheduler(scheduler: any): void {
    this._relayEnv.injectTaskScheduler(scheduler);
  }

  injectCacheManager(cacheManager: any): void {
    this._relayEnv.injectCacheManager(cacheManager);
  }

  primeCache(querySet: any, callback: any): any {
    return this._relayEnv.primeCache(querySet, callback);
  }

  forceFetch(querySet: any, callback: any): any {
    return this._relayEnv.forceFetch(querySet, callback);
  }

  read(node: any, dataID: any, options?: any): any {
    return this._relayEnv.read(node, dataID, options);
  }

  readAll(node: any, dataIDs: any, options?: any): any {
    return this._relayEnv.readAll(node, dataIDs, options);
  }

  readQuery(root: any, options?: any): any {
    return this._relayEnv.readQuery(root, options);
  }

  observe(fragment: any, dataID: any): any {
    return this._relayEnv.observe(fragment, dataID);
  }

  getFragmentResolver(fragment: any, onNext: () => void): any {
    return this._relayEnv.getFragmentResolver(fragment, onNext);
  }
}
