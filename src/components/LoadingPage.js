/* eslint-disable react/jsx-no-target-blank */

import React, { PropTypes } from 'react';
import Loading from 'react-loading';
import { Jumbotron } from 'react-bootstrap';
import { relayStore } from '../clientStores';

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
            Waiting while warming up GraphQL server on Heroku and data returns 
            <br />
            <a href={relayStore.endpoint} target="_blank">{relayStore.endpoint}</a>
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
