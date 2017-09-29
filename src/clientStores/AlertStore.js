/* @flow */

import * as React from 'react';

export type AlertStatusType = 'success' | 'error' | 'info';
export type AlertIdx = number | string;

export type AlertData = {
  idx?: AlertIdx,
  msg: React.Node | string,
  type?: AlertStatusType,
  children?: any,
  msgPre?: Element,
  onClose?: Function,
  autoClose?: number,
};

type EventTypes = 'add' | 'del' | string; // eslint-disable-line

export default class AlertStoreSTUB {
  add(data: $Shape<AlertData>): AlertIdx {
    console.log(data);
    return 0;
  }

  del(idx: AlertIdx): void {
    // this.delete(idx);
  }
}
