import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Region from './Region';

class RegionList extends React.Component {
  static propTypes = {
    regionList: PropTypes.array.isRequired,
  };

  render() {
    const { regionList = [] } = this.props;

    return (
      <div>
        { regionList.map((region, i) => {
          return <Region key={i} region={region} />;
        })}
      </div>
    );
  }
}

export default Relay.createContainer(RegionList, {
  fragments: {
    regionList: () => Relay.QL`
      fragment on Region @relay(plural: true) {
        ${Region.getFragment('region')}
      }
    `,
  },
});
