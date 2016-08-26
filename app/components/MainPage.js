/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function MainPage() {
  return (
    <div>
      <Jumbotron>
        <div className="row">
          <div className="col-sm-9">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h2>
                Northwind data explorer via Relay
                <br />
                <small>graphql-compose inside</small>
              </h2>
            </div>
            <p>
              This is a true story. The events depicted took place
              in <b>Northwind company</b> in <b>1996-1998</b>.
              At the request of the survivors, the names have been changed.
              Out of respect for the dead, the rest has been told exactly as it occurred.
            </p>
            <p style={{ textAlign: 'right', fontWeight: 'bold' }}>© Fargo</p>
          </div>
          <div className="col-sm-3 hidden-xs">
            <img width="185" src="./fargo500.jpg" alt="Fargo poster" />
          </div>
        </div>
      </Jumbotron>

      <div>
        <h4>Source code of this client app</h4>
        <a href="https://github.com/nodkz/relay-northwind-app" target="_blank">https://github.com/nodkz/relay-northwind-app</a>
      </div>
      <br />
      <div>
        <h4>Source code of server-side (GraphQL + MongoDB)</h4>
        <a href="http://graphql-compose.herokuapp.com/northwind/" target="_blank">GraphiQL for writing queries by hands</a>
        <br />
        <a href="http://graphql-compose.herokuapp.com/" target="_blank">Query examples to GraphQL Server</a>
        <br />
        <a href="https://github.com/nodkz/graphql-compose-examples/tree/master/examples/northwind" target="_blank">GraphQL server source code (graphql-compose inside)</a>
        <br />
        <a href="https://github.com/nodkz/graphql-compose-examples/tree/master/examples/northwind/data/json" target="_blank">All data in JSON format for your demos and apps</a>
      </div>
      <br />
      <div>
        <h4>Used graphql-compose modules</h4>
        <a href="https://github.com/nodkz/graphql-compose" target="_blank">graphql-compose</a>
        <br />
        <a href="https://github.com/nodkz/graphql-compose-mongoose" target="_blank">graphql-compose-mongoose</a>
        <br />
        <a href="https://github.com/nodkz/graphql-compose-relay" target="_blank">graphql-compose-relay</a>
        <br />
        <a href="https://github.com/nodkz/graphql-compose-connection" target="_blank">graphql-compose-connection</a>
        <br />
      </div>
    </div>
  );
}
