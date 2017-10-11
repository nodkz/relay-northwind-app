/* @flow */

import * as React from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
  children: React.Node,
};

type State = {
  message: ?string,
  componentStack: ?string,
};

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { message: null, componentStack: null };

  componentDidCatch(error: Error, info: any) {
    this.setState({ message: error.message, componentStack: info.componentStack });
  }

  render() {
    const { message, componentStack } = this.state;
    if (message) {
      return (
        <div style={{ display: 'inline-block' }}>
          <Alert bsStyle="danger" style={{ textAlign: 'left' }}>
            <b style={{ fontSize: '18px' }}>Error: {message}</b>
            <br />
            <pre style={{ fontSize: '10px', padding: '3px', margin: '10px 0 0 0' }}>
              {componentStack}
            </pre>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}
