/**
 * @flow
 * @relayHash 3fbfa048e6978c40ff063d979f00ca57
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ShipperListQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query ShipperListQuery {
  viewer {
    ...ShipperList_viewer
  }
}

fragment ShipperList_viewer on Viewer {
  shipperList {
    ...Shipper_shipper
    id
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShipperListQuery",
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
            "kind": "FragmentSpread",
            "name": "ShipperList_viewer",
            "args": null
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
  "name": "ShipperListQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "ShipperListQuery",
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
            "args": null,
            "concreteType": "Shipper",
            "name": "shipperList",
            "plural": true,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "id",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "type": "Shipper",
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
                  }
                ]
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
  "text": "query ShipperListQuery {\n  viewer {\n    ...ShipperList_viewer\n  }\n}\n\nfragment ShipperList_viewer on Viewer {\n  shipperList {\n    ...Shipper_shipper\n    id\n  }\n}\n\nfragment Shipper_shipper on Shipper {\n  shipperID\n  companyName\n  phone\n  orderConnection {\n    count\n  }\n}\n"
};

module.exports = batch;
