/**
 * @flow
 * @relayHash 4e8558f2c7f429896bc913793e63e7ed
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleSupplierQueryResponse = {|
  +viewer: ?{|
    +supplier: ?{| |};
  |};
|};
*/


/*
query ToggleSupplierQuery(
  $filter: FilterFindOneSupplierInput
) {
  viewer {
    supplier(filter: $filter) {
      ...Supplier
      id
    }
  }
}

fragment Supplier on Supplier {
  supplierID
  companyName
  contactName
  contactTitle
  address {
    ...Address_address
  }
  productConnection {
    count
  }
}

fragment Address_address on CustomerAddress {
  street
  city
  region
  postalCode
  country
  phone
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneSupplierInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleSupplierQuery",
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
                "type": "FilterFindOneSupplierInput"
              }
            ],
            "concreteType": "Supplier",
            "name": "supplier",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Supplier",
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
  "name": "ToggleSupplierQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneSupplierInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleSupplierQuery",
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
                "type": "FilterFindOneSupplierInput"
              }
            ],
            "concreteType": "Supplier",
            "name": "supplier",
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
                "name": "companyName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "contactName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "contactTitle",
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "args": null,
                "concreteType": "CustomerAddress",
                "name": "address",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "street",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "city",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "region",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "postalCode",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "country",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "phone",
                    "storageKey": null
                  }
                ],
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
  "text": "query ToggleSupplierQuery(\n  $filter: FilterFindOneSupplierInput\n) {\n  viewer {\n    supplier(filter: $filter) {\n      ...Supplier\n      id\n    }\n  }\n}\n\nfragment Supplier on Supplier {\n  supplierID\n  companyName\n  contactName\n  contactTitle\n  address {\n    ...Address_address\n  }\n  productConnection {\n    count\n  }\n}\n\nfragment Address_address on CustomerAddress {\n  street\n  city\n  region\n  postalCode\n  country\n  phone\n}\n"
};

module.exports = batch;
