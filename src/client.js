import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import 'whatwg-fetch';
import { AppContainer } from 'react-hot-loader';
import { relayStore, hashHistory } from './clientStores';
import ClientRootComponent from './clientRootComponent';

const appContainer = document.getElementById('app');

function render() {
  try {
    ReactDOM.render(
      <AppContainer>
        <ClientRootComponent environment={relayStore} history={hashHistory} />
      </AppContainer>,
      appContainer
    );
  } catch (e) {
    if (/Check the render method of `AppContainer`/.test(e.message)) {
      // re-render without HOT-RELOAD for getting normal error
      ReactDOM.render(
        <ClientRootComponent environment={relayStore} history={hashHistory} />,
        appContainer
      );
    } else {
      throw e;
    }
  }
}

if (module.hot) {
  module.hot.accept('./clientRootComponent', () => {
    const NextRoot = require('./clientRootComponent').default; // eslint-disable-line

    ReactDOM.render(
      <AppContainer>
        <NextRoot environment={relayStore} history={hashHistory} />
      </AppContainer>,
      appContainer
    );
  });
}

function run() {
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
