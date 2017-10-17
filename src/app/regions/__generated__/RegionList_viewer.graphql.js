/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type {ConcreteFragment} from 'relay-runtime';
export type RegionList_viewer = {|
  +regionList: ?$ReadOnlyArray<?{| |}>;
|};
*/


const fragment /*: ConcreteFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RegionList_viewer",
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
          "kind": "FragmentSpread",
          "name": "Region_region",
          "args": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Viewer"
};

module.exports = fragment;
