/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay/compat';
import type { Region_region } from './__generated__/Region_region.graphql';

type Props = {
  region: Region_region,
};

class Region extends React.Component<Props> {
  render() {
    const { region } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>RegionID</dt>
        <dd>{region.regionID}</dd>

        <dt>Name</dt>
        <dd>
          <b>{region.name}</b>
        </dd>

        <dt>Territories</dt>
        <dd>
          {region.territories &&
            region.territories.map(row => {
              if (!row) return null;

              return (
                <div key={row.territoryID}>
                  {row.name} ({row.territoryID})
                </div>
              );
            })}
        </dd>
      </dl>
    );
  }
}

export default createFragmentContainer(
  Region,
  graphql`
    fragment Region_region on Region {
      regionID
      name
      territories {
        territoryID
        name
      }
    }
  `
);
