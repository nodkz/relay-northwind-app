/**
 * @flow
 * @relayHash 8971afb6a0c652332b230a624c854d38
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleProductQueryResponse = {|
  +viewer: ?{|
    +product: ?{| |};
  |};
|};
*/


/*
query ToggleProductQuery(
  $filter: FilterFindOneProductInput
) {
  viewer {
    product(filter: $filter) {
      ...Product_product
      id
    }
  }
}

fragment Product_product on Product {
  productID
  name
  supplierID
  categoryID
  quantityPerUnit
  unitPrice
  unitsInStock
  unitsOnOrder
  reorderLevel
  discontinued
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneProductInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleProductQuery",
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
                "type": "FilterFindOneProductInput"
              }
            ],
            "concreteType": "Product",
            "name": "product",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Product_product",
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
  "name": "ToggleProductQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneProductInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleProductQuery",
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
                "type": "FilterFindOneProductInput"
              }
            ],
            "concreteType": "Product",
            "name": "product",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "productID",
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
                "name": "supplierID",
                "storageKey": null
              },
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
                "name": "quantityPerUnit",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "unitPrice",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "unitsInStock",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "unitsOnOrder",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "reorderLevel",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "discontinued",
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
  "text": "query ToggleProductQuery(\n  $filter: FilterFindOneProductInput\n) {\n  viewer {\n    product(filter: $filter) {\n      ...Product_product\n      id\n    }\n  }\n}\n\nfragment Product_product on Product {\n  productID\n  name\n  supplierID\n  categoryID\n  quantityPerUnit\n  unitPrice\n  unitsInStock\n  unitsOnOrder\n  reorderLevel\n  discontinued\n}\n"
};

module.exports = batch;
