import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Loading from '../Loading';
import CustomerConnectionItem from './CustomerConnectionItem';

const PER_PAGE = 10;

class CustomerConnection extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
    relay: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

    this.onScroll = this.onScroll.bind(this);
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
      if (this.props.viewer.customerConnection.pageInfo.hasNextPage) {
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
    return (
      <div
        onScroll={this.onScroll}
        ref={c => { this.scrollContainer = c; }}
        style={{ marginBottom: '200px' }}
      >

        <div>
          <h3>Total {this.props.viewer.customerConnection.count} records</h3>

          <div className="row">
            <div className="col-sm-1"><b>CutomerID</b></div>
            <div className="col-sm-2"><b>Company name</b></div>
            <div className="col-sm-2"><b>Contact name</b></div>
            <div className="col-sm-2"><b>Contact title</b></div>
            <div className="col-sm-2"><b>Address</b></div>
            <div className="col-sm-2"><b>Total orders</b></div>
          </div>
          <hr />
        </div>

        {this.props.viewer.customerConnection.edges.map(({ node }) => {
          return (
            <div key={node._id}>
              <CustomerConnectionItem
                customer={node}
                onItemClick={this.handleItemClick}
              />
            </div>
          );
        })}

        { this.props.viewer.customerConnection.pageInfo.hasNextPage &&
          <Loading />
        }
      </div>
    );
  }
}

export default Relay.createContainer(CustomerConnection, {
  initialVariables: {
    count: PER_PAGE,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        customerConnection(first: $count) {
          count
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
      }
    `,
  },
});
