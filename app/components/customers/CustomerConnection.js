import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import CustomerConnectionItem from './CustomerConnectionItem';

class CustomerConnection extends React.Component {
  static propTypes = {
    onItemClick: PropTypes.func,
    customerConnection: PropTypes.object,
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
        {this.props.customerConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <CustomerConnectionItem
                customer={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Relay.createContainer(CustomerConnection, {
  fragments: {
    customerConnection: () => Relay.QL`
      fragment on CustomerConnection {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            _id
            ${CustomerConnectionItem.getFragment('customer')}
          }
        }
      }
    `,
  },
});
