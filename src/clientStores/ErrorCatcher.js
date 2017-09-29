/* @flow */

import type { StoresT } from './init';

export default class ErrorCatcher {
  _stores: StoresT;
  _isRavenStarted: boolean = false;
  _ravenSubscriptions: Array<() => {}> = [];
  _raven: any;

  constructor(stores: StoresT) {
    this._stores = stores;
    this._ravenStart();
  }

  captureMessage(
    msg: string,
    data?: {|
      level?: 'info' | 'warning' | 'error',
      tags?: { [key: string]: mixed },
      extra?: { [key: string]: mixed },
    |}
  ) {
    // this._raven.captureException(msg, data);
    console.error(msg, data);
  }

  captureException(e: Error) {
    // this._raven.captureException(e);
    console.error(e);
  }

  captureBreadcrumb(message: string, category: string, data?: ?Object) {
    // this._raven.captureBreadcrumb({
    //   message,
    //   category,
    //   data,
    // });
  }

  _ravenStart() {
    // if (this._isRavenStarted) return;
    // this._isRavenStarted = true;
    // this._raven = Raven; // TODO prepare for server side rendering
    //
    // if (typeof window !== 'undefined' && !__DEV__) {
    //   this._raven
    //     .config('https://xxxxx@sentry.io/1111111', {
    //       release: window.version,
    //       tags: { git_commit: window.git_commit },
    //       environment: process.env.NODE_ENV,
    //       autoBreadcrumbs: {
    //         xhr: true, // XMLHttpRequest
    //         console: true, // console logging
    //         dom: false, // DOM interactions, i.e. clicks/typing
    //         location: true, // url changes, including pushState/popState
    //       },
    //     })
    //     .install();
    //
    //   window.onunhandledrejection = evt => {
    //     this._raven.captureException(evt.reason);
    //   };
    //
    //   // on next tick when all stores will be initialized, subscribe on login/logout
    //   setTimeout(() => {
    //     this._ravenUpdateContext();
    //     this._ravenSubscribeOnContextChange();
    //   }, 0);
    // }
  }

  _ravenUpdateContext() {
    // console.log("[RAVEN] update context"); // eslint-disable-line
    // this._raven.setUserContext({
    //   id: this._stores.userApi.getEmail(),
    //   email: this._stores.userApi.getEmail(),
    // });
    // this._raven.setTagsContext({
    //   ADMIN_EMAIL: this._stores.adminApi.getEmail(),
    //   CABINET_ID: this._stores.cabinetApi.getId(),
    // });
  }

  _ravenSubscribeOnContextChange() {
    // this._ravenUnubscribeOnContextChange();
    //
    // const cb = this._ravenUpdateContext.bind(this);
    // this._stores.userApi.onLogin(cb);
    // this._stores.userApi.onLogout(cb);
    // this._stores.adminApi.onLogin(cb);
    // this._stores.adminApi.onLogout(cb);
    // this._stores.cabinetApi.onLogin(cb);
    // this._stores.cabinetApi.onLogout(cb);
  }

  _ravenUnubscribeOnContextChange() {
    this._ravenSubscriptions.forEach(unsub => {
      unsub();
    });
    this._ravenSubscriptions = [];
  }
}
