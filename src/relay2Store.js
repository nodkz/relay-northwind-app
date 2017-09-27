import Relay from 'react-relay';
import RelayNetworkDebug from 'react-relay/lib/RelayNetworkDebug';

// This variable will be replaced at build process by webpack
//    see webpack.DefinePlugin in /tools/webpack.config.commons.js
// By default `https://graphql-compose.herokuapp.com/northwind/`
// But may be overrided locally via .env file
const endpoint = process.env.RELAY_ENDPOINT;

let relayStore;
function relayCreateStore() {
  const env = new Relay.Environment();
  env.endpoint = endpoint;
  env.injectNetworkLayer(new Relay.DefaultNetworkLayer(env.endpoint));
  if (__DEV__) {
    RelayNetworkDebug.init(env);
  }
  env.reset = () => relayCreateStore();

  env.fetch = ({
    query,
    force = false,
    variables,
    onSuccess,
    onError,
    onStart,
    onEnd,
  }) => {
    return new Promise((resolve, reject) => {
      const q = Relay.createQuery(query, variables || {});
      if (onStart) onStart();

      const args = [
        { query: q },
        (readyState) => {
          if (readyState.error) {
            if (onError) onError(readyState.error);
            if (onEnd) onEnd();
            reject(readyState.error);
          }
          if (readyState.ready) {
            const result = env.readQuery(q)[0];
            if (onSuccess) onSuccess(result);
            if (onEnd) onEnd();
            resolve(result);
          }
        },
      ];

      if (force) {
        env.forceFetch(...args);
      } else {
        env.primeCache(...args);
      }
    });
  };

  env.mutate = ({
    query,
    variables,
    collisionKey,
    configs,
    onSuccess,
    onError,
    onStart,
    onEnd,
    optimisticQuery,
    optimisticResponse,
    optimisticConfigs,
  }) => {
    return new Promise((resolve, reject) => {
      // see docs https://facebook.github.io/relay/docs/api-reference-relay-graphql-mutation.html#content
      let vars;
      if (!variables) {
        vars = undefined;
      } else {
        if (variables.input) { // eslint-disable-line
          vars = variables;
        } else {
          vars = { input: variables };
        }
      }

      if (onStart) {
        onStart();
      }

      let collisionKeyComputed;
      if (collisionKey) {
        collisionKeyComputed = collisionKey;
      } else if (variables) {
        // if _id provided, then take it as collision key
        if (variables._id) {
          collisionKeyComputed = variables._id;
        } else if (variables.record && variables.record._id) {
          collisionKeyComputed = variables.record._id;
        }
      }

      const mutation = new Relay.GraphQLMutation(
        query,
        vars,
        null, // I don't use file upload, cause upload by signed url directly to S3
        relayStore,
        {
          onFailure: (transaction) => {
            if (onError) onError(transaction);
            if (onEnd) onEnd();
            reject(transaction.getError());
          },
          onSuccess: (response) => {
            if (onSuccess) onSuccess(response);
            if (onEnd) onEnd();
            resolve(response);
          },
        },
        collisionKeyComputed
      );

      if (optimisticResponse) {
        mutation.applyOptimistic(
          optimisticQuery || query, // if optimisticQuery not provided, then take query
          optimisticResponse,
          optimisticConfigs || configs,
        );
      }

      // we can get transaction here but no need, cause callbacks already defined in constructor
      mutation.commit(configs);
    });
  };

  relayStore = env;
  return env;
}
relayCreateStore();

export default relayStore;
