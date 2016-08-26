import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Shipper from './Shipper';

class ShipperList extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return (
      <div>
        <h3>Total {this.props.viewer.shipperList.length} records</h3>

        { this.props.viewer.shipperList.map((shipper, i) => {
          return <Shipper key={i} shipper={shipper} />;
        })}
      </div>
    );
  }
}

export default Relay.createContainer(ShipperList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        shipperList {
          ${Shipper.getFragment('shipper')}
        }
      }
    `,
  },
});
