/* @flow */

import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Shipper from './Shipper';
import type { ShipperList_viewer } from './__generated__/ShipperList_viewer.graphql';

type Props = {
  viewer: ShipperList_viewer,
};

class ShipperList extends React.Component<Props> {
  render() {
    const { shipperList } = this.props.viewer;

    if (!shipperList) {
      return <div>Shipper list is empty</div>;
    }

    return (
      <div>
        <h3>Total {shipperList.length} records</h3>

        {shipperList.map((shipper, i) => {
          return <Shipper key={i} shipper={shipper} />;
        })}
      </div>
    );
  }
}

export default createFragmentContainer(
  ShipperList,
  graphql`
    fragment ShipperList_viewer on Viewer {
      shipperList {
        ...Shipper_shipper
      }
    }
  `
);
