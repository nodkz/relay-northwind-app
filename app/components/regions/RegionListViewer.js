import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import RegionList from './RegionList';


class RegionListViewer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return <RegionList regionList={this.props.viewer.regionList} />;
  }
}

export default Relay.createContainer(RegionListViewer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        regionList {
          ${RegionList.getFragment('regionList')}
        }
      }
    `,
  },
});
