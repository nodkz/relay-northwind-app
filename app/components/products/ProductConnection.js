import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Well } from 'react-bootstrap';
import Loading from '../Loading';
import ProductConnectionItem from './ProductConnectionItem';
import ProductFilter from './ProductFilter';
import ProductHeaders from './ProductHeaders';

const PER_PAGE = 10;

class ProductConnection extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object.isRequired,
    hideFilter: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.onScroll = this.onScroll.bind(this);
    this.onFormFilter = this.onFormFilter.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => this.loadNextItemsIfNeeded(this.scrollContainer),
      500);

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    if (!this.state.loading) {
      this.loadNextItemsIfNeeded();
    }
  }

  onFormFilter(filter) {
    this.props.relay.setVariables({ filter });
  }

  loadNextItemsIfNeeded() {
    const elem = this.scrollContainer;
    const contentHeight = elem.offsetHeight;
    const y = window.pageYOffset + window.innerHeight;
    if (y >= contentHeight) {
      this.loadNextItems();
    }
  }

  loadNextItems() {
    this.setState({ loading: true }, () => {
      if (this.props.viewer.productConnection.pageInfo.hasNextPage) {
        this.props.relay.setVariables({
          count: this.props.relay.variables.count + PER_PAGE,
        }, (readyState) => { // this gets called twice https://goo.gl/ZsQ3Dy
          if (readyState.done) {
            this.setState({ loading: false }, () => { this.loadNextItemsIfNeeded(); });
          }
        });
      } else {
        window.removeEventListener('scroll', this.onScroll);
      }
    });
  }

  render() {
    const { hideFilter } = this.props;

    return (
      <div
        onScroll={this.onScroll}
        ref={c => { this.scrollContainer = c; }}
        style={{ marginBottom: hideFilter ? '20px' : '200px' }}
      >

        { !hideFilter &&
          <Well>
            <ProductFilter onFilter={this.onFormFilter} />
          </Well>
        }

        <ProductHeaders count={this.props.viewer.productConnection.count} />

        {this.props.viewer.productConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <ProductConnectionItem
                product={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}

        { this.props.viewer.productConnection.pageInfo.hasNextPage &&
          <Loading />
        }
      </div>
    );
  }
}

export default Relay.createContainer(ProductConnection, {
  initialVariables: {
    count: PER_PAGE,
    filter: null,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        productConnection(first: $count, filter: $filter) {
          count
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
      }
    `,
  },
});
