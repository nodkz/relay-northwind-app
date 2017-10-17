/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type Order_order = {|
  +orderID: ?number;
  +customerID: ?string;
  +employeeID: ?number;
  +orderDate: ?any;
  +requiredDate: ?any;
  +shippedDate: ?any;
  +shipVia: ?number;
  +freight: ?number;
  +shipName: ?string;
  +shipAddress: ?{| |};
  +details: ?$ReadOnlyArray<?{| |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Order_order",
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "shippedDate",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "orderID",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "employeeID",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "orderDate",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "requiredDate",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "customerID",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "shipVia",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "freight",
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "args": null,
      "name": "shipName",
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "CustomerAddress",
      "name": "shipAddress",
      "plural": false,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "Address_address",
          "args": null
        }
      ],
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "args": null,
      "concreteType": "OrderDetails",
      "name": "details",
      "plural": true,
      "selections": [
        {
          "kind": "FragmentSpread",
          "name": "OrderDetails_details",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Order"
};

module.exports = fragment;
