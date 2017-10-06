/**
 * @flow
 * @relayHash 039919a7da35923436cbf0f494537216
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleOrderQueryResponse = {|
  +viewer: ?{|
    +order: ?{| |};
  |};
|};
*/


/*
query ToggleOrderQuery(
  $filter: FilterFindOneOrderInput
) {
  viewer {
    order(filter: $filter) {
      ...Order_order
      id
    }
  }
}

fragment Order_order on Order {
  shippedDate
  orderID
  employeeID
  orderDate
  requiredDate
  customerID
  shipVia
  freight
  shipName
  shipAddress {
    ...Address_address
  }
  details {
    ...OrderDetails_details
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

fragment OrderDetails_details on OrderDetails {
  productID
  unitPrice
  quantity
  discount
  product {
    name
    id
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneOrderInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleOrderQuery",
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
                "type": "FilterFindOneOrderInput"
              }
            ],
            "concreteType": "Order",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Order_order",
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
  "name": "ToggleOrderQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneOrderInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleOrderQuery",
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
                "type": "FilterFindOneOrderInput"
              }
            ],
            "concreteType": "Order",
            "name": "order",
            "plural": false,
            "selections": [
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
                "name": "customerID",
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
                "name": "shippedDate",
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
                "concreteType": "OrderDetails",
                "name": "details",
                "plural": true,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "type": "OrderDetails",
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
                        "name": "unitPrice",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "quantity",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "discount",
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "args": null,
                        "concreteType": "Product",
                        "name": "product",
                        "plural": false,
                        "selections": [
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
                            "name": "id",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ]
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
  "text": "query ToggleOrderQuery(\n  $filter: FilterFindOneOrderInput\n) {\n  viewer {\n    order(filter: $filter) {\n      ...Order_order\n      id\n    }\n  }\n}\n\nfragment Order_order on Order {\n  shippedDate\n  orderID\n  employeeID\n  orderDate\n  requiredDate\n  customerID\n  shipVia\n  freight\n  shipName\n  shipAddress {\n    ...Address_address\n  }\n  details {\n    ...OrderDetails_details\n  }\n}\n\nfragment Address_address on CustomerAddress {\n  street\n  city\n  region\n  postalCode\n  country\n  phone\n}\n\nfragment OrderDetails_details on OrderDetails {\n  productID\n  unitPrice\n  quantity\n  discount\n  product {\n    name\n    id\n  }\n}\n"
};

module.exports = batch;
