/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import Region from './Region';
import type { RegionList_viewer } from './__generated__/RegionList_viewer.graphql';

type Props = {
  viewer: RegionList_viewer,
};

class RegionList extends React.Component<Props> {
  render() {
    const { regionList } = this.props.viewer;

    if (!regionList) {
      return <div>Region List is empty</div>;
    }

    return (
      <div>
        <h3>Total {regionList.length} records</h3>

        {regionList.map((region, i) => {
          return <Region key={i} region={region} />;
        })}
      </div>
    );
  }
}

export default createFragmentContainer(
  RegionList,
  graphql`
    fragment RegionList_viewer on Viewer {
      regionList {
        ...Region_region
      }
    }
  `
);
