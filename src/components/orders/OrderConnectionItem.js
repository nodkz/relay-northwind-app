import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import ToggleOrder from './ToggleOrder';

class OrderConnectionItem extends React.Component {
  static propTypes = {
    order: PropTypes.object,
    relay: PropTypes.object,
  };

  render() {
    const { order = {} } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-sm-1">{order.orderID}</div>
          <div className="col-sm-2">
            {order.customer.companyName}
          </div>
          <div className="col-sm-2">
            {order.employee.firstName}
            {' '}
            {order.employee.lastName}
            {' '}
            (id:{order.employeeID})
          </div>
          <div className="col-sm-2">
            {order.shipper.companyName}
            {' '}
            (id:{order.shipVia})
          </div>
          <div className="col-sm-2">{`${order.orderDate}`.substr(0, 10)}</div>
          <div className="col-sm-2">{order.freight}</div>
        </div>
        <ToggleOrder id={order.orderID} />
      </div>
    );
  }
}

export default Relay.createContainer(OrderConnectionItem, {
  fragments: {
    order: () => Relay.QL`
      fragment on Order {
        id
        orderID
        customerID
        employeeID
        shipVia
        customer {
          companyName
        }
        shipper {
          companyName
        }
        employee {
          firstName
          lastName
        }
        orderDate
        freight
      }
    `,
  },
});
