/**
 * @flow
 * @relayHash 15cb98b293211a1203541be1da2755c3
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleCustomerQueryResponse = {|
  +viewer: ?{|
    +customer: ?{| |};
  |};
|};
*/


/*
query ToggleCustomerQuery(
  $filter: FilterFindOneCustomerInput
) {
  viewer {
    customer(filter: $filter) {
      ...Customer_customer
      id
    }
  }
}

fragment Customer_customer on Customer {
  customerID
  companyName
  contactName
  contactTitle
  address {
    ...Address_address
  }
  orderConnection {
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
        "type": "FilterFindOneCustomerInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleCustomerQuery",
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
                "type": "FilterFindOneCustomerInput"
              }
            ],
            "concreteType": "Customer",
            "name": "customer",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Customer_customer",
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
  "name": "ToggleCustomerQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneCustomerInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleCustomerQuery",
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
                "type": "FilterFindOneCustomerInput"
              }
            ],
            "concreteType": "Customer",
            "name": "customer",
            "plural": false,
            "selections": [
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
  "text": "query ToggleCustomerQuery(\n  $filter: FilterFindOneCustomerInput\n) {\n  viewer {\n    customer(filter: $filter) {\n      ...Customer_customer\n      id\n    }\n  }\n}\n\nfragment Customer_customer on Customer {\n  customerID\n  companyName\n  contactName\n  contactTitle\n  address {\n    ...Address_address\n  }\n  orderConnection {\n    count\n  }\n}\n\nfragment Address_address on CustomerAddress {\n  street\n  city\n  region\n  postalCode\n  country\n  phone\n}\n"
};

module.exports = batch;
