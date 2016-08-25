import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import OrderConnectionItem from './OrderConnectionItem';

class OrderConnection extends React.Component {
  static propTypes = {
    onItemClick: PropTypes.func,
    orderConnection: PropTypes.object,
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
        {this.props.orderConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <OrderConnectionItem
                order={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Relay.createContainer(OrderConnection, {
  fragments: {
    orderConnection: () => Relay.QL`
      fragment on OrderConnection {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            _id
            ${OrderConnectionItem.getFragment('order')}
          }
        }
      }
    `,
  },
});
