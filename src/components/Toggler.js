/* @flow */

import * as React from 'react';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from 'clientStores';

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
    const { component } = this.props;
    const { data, isOpen } = this.state;

    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          children={isOpen ? 'close' : 'open'}
        />
        {isOpen &&
          (data ? (
            // $FlowFixMe
            <div className="lrspace bspace">{React.createElement(component, data)}</div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
