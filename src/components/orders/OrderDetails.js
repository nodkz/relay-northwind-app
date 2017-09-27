import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Table } from 'react-bootstrap';
import ToggleProduct from '../products/ToggleProduct';


class OrderDetails extends React.Component {
  static propTypes = {
    details: PropTypes.array.isRequired,
  };

  render() {
    const { details = [] } = this.props;

    return (
      <Table bordered condensed hover>
        <thead>
          <tr>
            <th>ProductID</th>
            <th>ProductName</th>
            <th>UnitPrice</th>
            <th>Quantity</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          { details.map((row, i) =>
            <tr key={i}>
              <td>{row.productID}</td>
              <td>
                {row.product.name}
                {' '}
                <ToggleProduct id={row.productID} />
              </td>
              <td>{row.unitPrice}</td>
              <td>{row.quantity}</td>
              <td>{row.discount}</td>
            </tr>
          )}
        </tbody>
      </Table>
    );
  }
}

export default Relay.createContainer(OrderDetails, {
  fragments: {
    details: () => Relay.QL`
      fragment on OrderDetails @relay(plural: true) {
        productID
        unitPrice
        quantity
        discount
        product {
          name
        }
      }
    `,
  },
});
