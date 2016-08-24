import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Loading from 'react-loading';
import Customer from './Customer';

const PER_PAGE = 10;
const LOAD_NEXT_IF_PIXEL = 100;

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
    // const currentId = this.props.params.cvId;

    return (
      <div>
        {this.props.customerConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <Customer
                customer={node}
                onItemClick={this.handleItemClick}
                // isActive={node._id === currentId}
                route={this.props.route}
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
            ${Customer.getFragment('customer')}
          }
        }
      }
    `,
  },
});
