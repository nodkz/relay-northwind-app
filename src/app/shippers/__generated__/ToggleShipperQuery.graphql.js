/**
 * @flow
 * @relayHash 9b28509d25e6a7494b4c704ffe843a01
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleShipperQueryResponse = {|
  +viewer: ?{|
    +shipper: ?{| |};
  |};
|};
*/


/*
query ToggleShipperQuery(
  $filter: FilterFindOneShipperInput
) {
  viewer {
    shipper(filter: $filter) {
      ...Shipper_shipper
      id
    }
  }
}

fragment Shipper_shipper on Shipper {
  shipperID
  companyName
  phone
  orderConnection {
    count
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneShipperInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleShipperQuery",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": "viewer",
        "args": null,
        "concreteType": "Viewer",
        "name": "__viewer_viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "filter",
                "variableName": "filter",
                "type": "FilterFindOneShipperInput"
              }
            ],
            "concreteType": "Shipper",
            "name": "shipper",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Shipper_shipper",
                "args": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "ToggleShipperQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneShipperInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleShipperQuery",
    "operation": "query",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "filter",
                "variableName": "filter",
                "type": "FilterFindOneShipperInput"
              }
            ],
            "concreteType": "Shipper",
            "name": "shipper",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "shipperID",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "companyName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "phone",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "OrderConnection",
                "name": "orderConnection",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "kind": "LinkedHandle",
        "alias": null,
        "args": null,
        "handle": "viewer",
        "name": "viewer",
        "key": "",
        "filters": null
      }
    ]
  },
  "text": "query ToggleShipperQuery(\n  $filter: FilterFindOneShipperInput\n) {\n  viewer {\n    shipper(filter: $filter) {\n      ...Shipper_shipper\n      id\n    }\n  }\n}\n\nfragment Shipper_shipper on Shipper {\n  shipperID\n  companyName\n  phone\n  orderConnection {\n    count\n  }\n}\n"
};

module.exports = batch;
