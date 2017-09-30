import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import 'whatwg-fetch';
import App from 'app/App';

const appContainer = document.getElementById('app');

function render() {
  ReactDOM.render(<App />, appContainer);
}

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const NextRoot = require('./app/App').default; // eslint-disable-line

    ReactDOM.render(<NextRoot />, appContainer);
  });
}

let isBootstraped = false;
function run() {
  if (isBootstraped) return;
  isBootstraped = true;

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);
  render();
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
