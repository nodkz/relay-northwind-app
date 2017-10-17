/* @flow */

import * as React from 'react';
import { Button } from 'react-bootstrap';
import { QueryRenderer } from 'react-relay';
import { relayStore } from 'clientStores';
import Loading from 'components/Loading';
import ErrorBoundary from 'components/ErrorBoundary';
import BrokenPage from 'components/BrokenPage';

type Props = {
  component: Class<React$Component<{ data: ?Object }>>,
  query: () => any,
  variables?: Object,
  prepareProps: (payload: Object) => Object,
};

type State = {
  isOpen: boolean,
  data: ?Object,
};

export default class Toggler extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    data: null,
  };

  toggle = () => {
    const { data, isOpen } = this.state;
    const { query, variables, prepareProps } = this.props;

    this.setState({
      isOpen: !isOpen,
    });

    if (!data) {
      relayStore.fetch({ query, variables }).then(res => {
        this.setState({
          data: prepareProps(res),
        });
      });
    }
  };

  render() {
    const { component, query, variables, prepareProps } = this.props;
    const { data, isOpen } = this.state;

    return (
      <ErrorBoundary>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          children={isOpen ? 'close' : 'open'}
        />
        {isOpen && (
          <div className="lrspace bspace">
            <QueryRenderer
              environment={relayStore.env}
              query={query}
              variables={variables}
              render={({ error, props }) => {
                if (error) {
                  return <BrokenPage message={error.message} />;
                } else if (props) {
                  return React.createElement(component, {
                    ...prepareProps(props),
                  });
                }
                return <Loading />;
              }}
            />
          </div>
        )}
      </ErrorBoundary>
    );
  }
}
