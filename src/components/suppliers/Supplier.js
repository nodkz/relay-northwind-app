import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Address from '../Address';
import ToggleProductCollection from '../products/ToggleProductConnection';

class Supplier extends React.Component {
  static propTypes = {
    supplier: PropTypes.object,
  };

  render() {
    const { supplier = {} } = this.props;

    return (
      <div className="bordered">
        <dl className="dl-horizontal">
          <dt>SupplierID</dt>
          <dd>{supplier.supplierID}</dd>

          <dt>CompanyName</dt>
          <dd>{supplier.companyName}</dd>

          <dt>ContactName</dt>
          <dd>{supplier.contactName}</dd>

          <dt>ContactTitle</dt>
          <dd>{supplier.contactTitle}</dd>

          <dt>Address</dt>
          <dd><Address address={supplier.address} /></dd>

          <dt>Total products</dt>
          <dd>
            <b>{supplier.productConnection.count}</b>
            <ToggleProductCollection filter={{ supplierID: supplier.supplierID }} />
          </dd>
        </dl>
      </div>
    );
  }
}

export default Relay.createContainer(Supplier, {
  fragments: {
    supplier: () => Relay.QL`
      fragment on Supplier {
        supplierID
        companyName
        contactName
        contactTitle
        address {
          ${Address.getFragment('address')}
        }
        productConnection {
          count
        }
      }
    `,
  },
});
