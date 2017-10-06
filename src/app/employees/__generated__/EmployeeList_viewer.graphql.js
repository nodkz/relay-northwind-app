/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type EmployeeList_viewer = {|
  +employeeList: ?$ReadOnlyArray<?{| |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EmployeeList_viewer",
  "selections": [
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "Employee",
      "name": "employeeList",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Employee_employee",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
