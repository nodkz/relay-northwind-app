/* eslint-disable react/jsx-no-target-blank */

import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Jumbotron } from 'react-bootstrap';

export default class LoadingPage extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h2>
          One moment, please...
          <br />
          <small>
            Waiting
            {' '}
            <a href="https://graphql-compose.herokuapp.com/northwind/" target="_blank">https://graphql-compose.herokuapp.com/northwind/</a>
          </small>
        </h2>
        <div className="row">
          <div className="col-xs-2 col-xs-offset-5">
            <Loading type="bubbles" color="#3385b5" />
          </div>
        </div>
      </Jumbotron>
    );
  }
}
