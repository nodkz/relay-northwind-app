/* @flow */

import React from 'react';
import { Jumbotron, Button, Alert } from 'react-bootstrap';

type Props = {
  message: string,
};

export default class BrokenPage extends React.Component<Props> {
  reloadPage = () => {
    if (window) {
      window.location.reload(true);
    }
  };

  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1>
          {this.props.message ? (
            <Alert bsStyle="danger">{this.props.message}</Alert>
          ) : (
            <span>Shit happens!</span>
          )}
        </h1>
        <Button onClick={this.reloadPage}>Reload page</Button>
      </Jumbotron>
    );
  }
}
