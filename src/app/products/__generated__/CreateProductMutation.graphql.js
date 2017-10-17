/**
 * @flow
 * @relayHash c8d453d0450e912d41fc116b1a982f8c
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type CreateProductMutationVariables = {|
  input: {
    record: {
      productID?: ?number;
      name?: ?string;
      supplierID?: ?number;
      categoryID?: ?number;
      quantityPerUnit?: ?string;
      unitPrice?: ?number;
      unitsInStock?: ?number;
      unitsOnOrder?: ?number;
      reorderLevel?: ?number;
      discontinued?: ?boolean;
    };
    clientMutationId?: ?string;
  };
|};
export type CreateProductMutationResponse = {|
  +createProduct: ?{|
    +record: ?{|
      +supplierID: ?number;
      +categoryID: ?number;
      +name: ?string;
      +unitsInStock: ?number;
      +unitPrice: ?number;
    |};
  |};
|};
*/


/*
mutation CreateProductMutation(
  $input: RelayCreateOneProductInput!
) {
  createProduct(input: $input) {
    record {
      supplierID
      categoryID
      name
      unitsInStock
      unitPrice
      id
    }
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RelayCreateOneProductInput!",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateProductMutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RelayCreateOneProductInput!"
          }
        ],
        "concreteType": "CreateOneProductPayload",
        "name": "createProduct",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Product",
            "name": "record",
            "plural": false,
            "selections": [
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
                "name": "name",
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
                "name": "unitPrice",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation"
  },
  "id": null,
  "kind": "Batch",
  "metadata": {},
  "name": "CreateProductMutation",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "input",
        "type": "RelayCreateOneProductInput!",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "CreateProductMutation",
    "operation": "mutation",
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input",
            "type": "RelayCreateOneProductInput!"
          }
        ],
        "concreteType": "CreateOneProductPayload",
        "name": "createProduct",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": null,
            "args": null,
            "concreteType": "Product",
            "name": "record",
            "plural": false,
            "selections": [
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
                "name": "name",
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
                "name": "unitPrice",
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
      }
    ]
  },
  "text": "mutation CreateProductMutation(\n  $input: RelayCreateOneProductInput!\n) {\n  createProduct(input: $input) {\n    record {\n      supplierID\n      categoryID\n      name\n      unitsInStock\n      unitPrice\n      id\n    }\n  }\n}\n"
};

module.exports = batch;
