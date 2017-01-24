import Relay from 'react-relay';
import RelayNetworkDebug from 'react-relay/lib/RelayNetworkDebug';

let relayStore;
function relayCreateStore() {
  const env = new Relay.Environment();
  env.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));
  if (__DEV__) {
    RelayNetworkDebug.init(env);
  }
  env.reset = () => relayCreateStore();
  env.mutate = ({
    query,
    variables,
    collisionKey,
    configs,
    onSuccess,
    onError,
    onEnd,
    onStart,
    optimisticQuery,
    optimisticResponse,
    optimisticConfigs,
  }) => {
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
        },
        onSuccess: (response) => {
          if (onSuccess) onSuccess(response);
          if (onEnd) onEnd();
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

    return mutation;
  };

  relayStore = env;
  return env;
}
relayCreateStore();

export default relayStore;
