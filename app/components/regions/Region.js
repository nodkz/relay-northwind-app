import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Region extends React.Component {
  static propTypes = {
    region: PropTypes.object.isRequired,
  };

  render() {
    const { region } = this.props;

    return (
      <dl className="dl-horizontal bordered">
        <dt>RegionID</dt>
        <dd>{region.regionID}</dd>

        <dt>Name</dt>
        <dd><b>{region.name}</b></dd>

        <dt>Territories</dt>
        <dd>
          { region.territories.map((row, i) => {
            return <div key={i}>{row.name} ({row.territoryID})</div>;
          })}
        </dd>
      </dl>
    );
  }
}

export default Relay.createContainer(Region, {
  fragments: {
    region: () => Relay.QL`
      fragment on Region {
        regionID
        name
        territories {
          territoryID
          name
        }
      }
    `,
  },
});
