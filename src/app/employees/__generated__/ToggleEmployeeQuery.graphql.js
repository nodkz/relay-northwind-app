/**
 * @flow
 * @relayHash 5c6fd1c9c9225bfb1428bfed728c95e5
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type ToggleEmployeeQueryResponse = {|
  +viewer: ?{|
    +employee: ?{| |};
  |};
|};
*/


/*
query ToggleEmployeeQuery(
  $filter: FilterFindOneEmployeeInput
) {
  viewer {
    employee(filter: $filter) {
      ...Employee
      id
    }
  }
}

fragment Employee on Employee {
  hireDate
  employeeID
  firstName
  title
  titleOfCourtesy
  birthDate
  lastName
  notes
  reportsTo
  address {
    ...Address_address
  }
  chief {
    lastName
    firstName
    id
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
        "type": "FilterFindOneEmployeeInput",
        "defaultValue": null
      }
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ToggleEmployeeQuery",
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
                "type": "FilterFindOneEmployeeInput"
              }
            ],
            "concreteType": "Employee",
            "name": "employee",
            "plural": false,
            "selections": [
              {
                "kind": "FragmentSpread",
                "name": "Employee",
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
  "name": "ToggleEmployeeQuery",
  "query": {
    "argumentDefinitions": [
      {
        "kind": "LocalArgument",
        "name": "filter",
        "type": "FilterFindOneEmployeeInput",
        "defaultValue": null
      }
    ],
    "kind": "Root",
    "name": "ToggleEmployeeQuery",
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
                "type": "FilterFindOneEmployeeInput"
              }
            ],
            "concreteType": "Employee",
            "name": "employee",
            "plural": false,
            "selections": [
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
                "name": "lastName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "firstName",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "title",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "titleOfCourtesy",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "birthDate",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "hireDate",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "notes",
                "storageKey": null
              },
              {
                "kind": "ScalarField",
                "alias": null,
                "args": null,
                "name": "reportsTo",
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
                "concreteType": "Employee",
                "name": "chief",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "lastName",
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "firstName",
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
  "text": "query ToggleEmployeeQuery(\n  $filter: FilterFindOneEmployeeInput\n) {\n  viewer {\n    employee(filter: $filter) {\n      ...Employee\n      id\n    }\n  }\n}\n\nfragment Employee on Employee {\n  hireDate\n  employeeID\n  firstName\n  title\n  titleOfCourtesy\n  birthDate\n  lastName\n  notes\n  reportsTo\n  address {\n    ...Address_address\n  }\n  chief {\n    lastName\n    firstName\n    id\n  }\n  orderConnection {\n    count\n  }\n}\n\nfragment Address_address on CustomerAddress {\n  street\n  city\n  region\n  postalCode\n  country\n  phone\n}\n"
};

module.exports = batch;
