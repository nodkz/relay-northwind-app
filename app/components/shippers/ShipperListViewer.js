import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import ShipperList from './ShipperList';


class ShipperListViewer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return <ShipperList shipperList={this.props.viewer.shipperList} />;
  }
}

export default Relay.createContainer(ShipperListViewer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        shipperList {
          ${ShipperList.getFragment('shipperList')}
        }
      }
    `,
  },
});
