import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import SupplierConnectionItem from './SupplierConnectionItem';

class SupplierConnection extends React.Component {
  static propTypes = {
    onItemClick: PropTypes.func,
    supplierConnection: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(i) {
    if (this.props.onItemClick) {
      this.props.onItemClick(i);
    }
  }

  render() {
    return (
      <div>
        <h3>Total {this.props.supplierConnection.count} records</h3>

        {this.props.supplierConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <SupplierConnectionItem
                supplier={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Relay.createContainer(SupplierConnection, {
  fragments: {
    supplierConnection: () => Relay.QL`
      fragment on SupplierConnection {
        count
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            _id
            ${SupplierConnectionItem.getFragment('supplier')}
          }
        }
      }
    `,
  },
});
