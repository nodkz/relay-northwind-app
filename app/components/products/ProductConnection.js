import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import ProductConnectionItem from './ProductConnectionItem';

class ProductConnection extends React.Component {
  static propTypes = {
    onItemClick: PropTypes.func,
    productConnection: PropTypes.object,
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
        {this.props.productConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <ProductConnectionItem
                product={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Relay.createContainer(ProductConnection, {
  fragments: {
    productConnection: () => Relay.QL`
      fragment on ProductConnection {
        pageInfo {
          hasNextPage
        }
        edges {
          cursor
          node {
            _id
            ${ProductConnectionItem.getFragment('product')}
          }
        }
      }
    `,
  },
});
