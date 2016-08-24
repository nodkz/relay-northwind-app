import React from 'react';
import { Jumbotron } from 'react-bootstrap';

export default function MainPage(props) {
  return (
    <Jumbotron>
      <div className="row">
        <div className="col-sm-9">
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2>Northwind data explorer via Relay</h2>
          </div>
          <p>
            This is a true story. The events depicted took place in <b>Northwind company</b> in <b>1996-1998</b>.
            At the request of the survivors, the names have been changed.
            Out of respect for the dead, the rest has been told exactly as it occurred.
          </p>
          <p style={{ textAlign: 'right', fontWeight: 'bold' }}>© Fargo</p>
        </div>
        <div className="col-sm-3 hidden-xs">
          <img width="185" src="/fargo500.jpg" alt="Fargo poster" />
        </div>
      </div>
    </Jumbotron>
  );
}
