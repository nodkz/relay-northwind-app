/* @flow */

import React from 'react';
import { Jumbotron } from 'react-bootstrap';

type Props = {};
type State = { cnt: number };

export default class Page404 extends React.Component<Props, State> {
  state: State = { cnt: 404 };

  onClick() {
    this.setState({ cnt: this.state.cnt + 1 });
  }

  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1 onClick={this.onClick} style={{ userSelect: 'none', cursor: 'pointer' }}>
          {this.state.cnt}
        </h1>
        <p>Страница не найдена</p>
      </Jumbotron>
    );
  }
}
