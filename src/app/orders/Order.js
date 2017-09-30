import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import Address from 'app/Address';
import OrderDetails from './OrderDetails';
import ToggleCustomer from 'app/customers/ToggleCustomer';
import ToggleEmployee from 'app/employees/ToggleEmployee';
import ToggleShipper from 'app/shippers/ToggleShipper';

class Order extends React.Component {
  static propTypes = {
    order: PropTypes.object,
  };

  render() {
    const { order = {} } = this.props;

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>OrderID</dt>
          <dd>{order.orderID}</dd>

          <dt>CustomerID</dt>
          <dd>
            {order.customerID}
            <ToggleCustomer id={order.customerID} />
          </dd>

          <dt>EmployeeID</dt>
          <dd>
            {order.employeeID}
            <ToggleEmployee id={order.employeeID} />
          </dd>

          <dt>OrderDate</dt>
          <dd>{`${order.orderDate}`.substr(0, 10)}</dd>

          <dt>RequiredDate</dt>
          <dd>{`${order.requiredDate}`.substr(0, 10)}</dd>

          <dt>ShippedDate</dt>
          <dd>{`${order.shippedDate}`.substr(0, 10)}</dd>

          <dt>ShipVia</dt>
          <dd>
            {order.shipVia}
            <ToggleShipper id={order.shipVia} />
          </dd>

          <dt>Freight</dt>
          <dd>{order.freight}</dd>

          <dt>ShipAddress</dt>
          <dd>
            <i>{order.shipName}</i>
            <Address address={order.shipAddress} />
          </dd>
        </dl>
        <div className="lrspace">
          <OrderDetails details={order.details} />
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(Order, {
  fragments: {
    order: () => Relay.QL`
      fragment on Order {
        orderID
        customerID
        employeeID
        orderDate
        requiredDate
        shippedDate
        shipVia
        freight
        shipName
        shipAddress {
          ${Address.getFragment('address')}
        }
        details {
          ${OrderDetails.getFragment('details')}
        }
      }
    `,
  },
});
