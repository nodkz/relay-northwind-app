/**
 * @flow
 * @relayHash e962b591c4456504211efad835e531a9
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteBatch} from 'relay-runtime';
export type RegionListQueryResponse = {|
  +viewer: ?{| |};
|};
*/


/*
query RegionListQuery {
  viewer {
    ...RegionList_viewer
  }
}

fragment RegionList_viewer on Viewer {
  regionList {
    ...Region_region
    id
  }
}

fragment Region_region on Region {
  regionID
  name
  territories {
    territoryID
    name
  }
}
*/

const batch /*: ConcreteBatch*/ = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "RegionListQuery",
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
            "name": "RegionList_viewer",
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
  "name": "RegionListQuery",
  "query": {
    "argumentDefinitions": [],
    "kind": "Root",
    "name": "RegionListQuery",
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
            "concreteType": "Region",
            "name": "regionList",
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
                "type": "Region",
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "args": null,
                    "name": "regionID",
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
                    "kind": "LinkedField",
                    "alias": null,
                    "args": null,
                    "concreteType": "RegionTerritories",
                    "name": "territories",
                    "plural": true,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "territoryID",
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "args": null,
                        "name": "name",
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
  "text": "query RegionListQuery {\n  viewer {\n    ...RegionList_viewer\n  }\n}\n\nfragment RegionList_viewer on Viewer {\n  regionList {\n    ...Region_region\n    id\n  }\n}\n\nfragment Region_region on Region {\n  regionID\n  name\n  territories {\n    territoryID\n    name\n  }\n}\n"
};

module.exports = batch;
