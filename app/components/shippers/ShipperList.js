import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Shipper from './Shipper';

class ShipperList extends React.Component {
  static propTypes = {
    shipperList: PropTypes.array.isRequired,
  };

  render() {
    const { shipperList = [] } = this.props;

    return (
      <div>
        { shipperList.map((shipper, i) => {
          return <Shipper key={i} shipper={shipper} />;
        })}
      </div>
    );
  }
}

export default Relay.createContainer(ShipperList, {
  fragments: {
    shipperList: () => Relay.QL`
      fragment on Shipper @relay(plural: true) {
        ${Shipper.getFragment('shipper')}
      }
    `,
  },
});
