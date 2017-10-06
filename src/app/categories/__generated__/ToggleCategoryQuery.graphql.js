/**
 * @flow
 * @relayHash 2c3453447643f207867ffa141922cfbe
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleCategoryQueryResponse = {|
  +viewer: ?{|
    +category: ?{| |};
  |};
|};
*/


/*
query ToggleCategoryQuery(
  $filter: FilterFindOneCategoryInput
) {
  viewer {
    category(filter: $filter) {
      ...Category
      id
    }
  }
}

fragment Category on Category {
  categoryID
  name
  description
  productConnection {
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
        "type": "FilterFindOneCategoryInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleCategoryQuery",
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
                "type": "FilterFindOneCategoryInput"
              }
            ],
            "concreteType": "Category",
            "name": "category",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Category",
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
  "name": "ToggleCategoryQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneCategoryInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleCategoryQuery",
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
                "type": "FilterFindOneCategoryInput"
              }
            ],
            "concreteType": "Category",
            "name": "category",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "categoryID",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "name",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "description",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "ProductConnection",
                "name": "productConnection",
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
  "text": "query ToggleCategoryQuery(\n  $filter: FilterFindOneCategoryInput\n) {\n  viewer {\n    category(filter: $filter) {\n      ...Category\n      id\n    }\n  }\n}\n\nfragment Category on Category {\n  categoryID\n  name\n  description\n  productConnection {\n    count\n  }\n}\n"
};

module.exports = batch;
