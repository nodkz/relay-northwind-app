import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Loading from 'react-loading';
import CustomerConnection from './CustomerConnection';

const PER_PAGE = 10;
const LOAD_NEXT_IF_PIXEL = 100;

class CustomerConnectionViewer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
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
      () => this.loadNextItemsIfNeeded(this.refs.scrollContainer),
      500);

    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll(e) {
    if (!this.state.loading) {
      this.loadNextItemsIfNeeded();
    }
  }

  loadNextItemsIfNeeded() {
    const elem = this.refs.scrollContainer;
    const contentHeight = elem.offsetHeight;
    const y = window.pageYOffset + window.innerHeight;
    if (y >= contentHeight) {
      this.loadNextItems();
    }
  }

  loadNextItems() {
    this.setState({ loading: true }, () => {
      setTimeout(() => { // set delay for visibility
        this.props.relay.setVariables({
          count: this.props.relay.variables.count + PER_PAGE,
        }, (readyState) => { // this gets called twice https://goo.gl/ZsQ3Dy
          if (readyState.done) {
            this.setState({ loading: false }, () => { this.loadNextItemsIfNeeded() });
          }
        });
      }, 1000);
    });
  }

  handleItemClick(i) {
    if (this.props.onItemClick) {
      this.props.onItemClick(i);
    }
  }

  render() {
    return (
      <div onScroll={this.onScroll} ref="scrollContainer">
        <CustomerConnection customerConnection = {this.props.viewer.customerConnection} />

        { this.props.viewer.customerConnection.pageInfo.hasNextPage &&
          <Loading type='bubbles' color='#3385b5' />
        }
      </div>
    );
  }
}

export default Relay.createContainer(CustomerConnectionViewer, {
  initialVariables: {
    count: PER_PAGE,
  },
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        customerConnection(first: $count) {
          pageInfo {
            hasNextPage
          }
          ${CustomerConnection.getFragment('customerConnection')}
        }
      }
    `,
  },
});
