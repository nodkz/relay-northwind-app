import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Button } from 'react-bootstrap';
import Loading from '../Loading';
import { relayStore } from '../../clientStores';
import Category from './Category';

export default class ToggleCategory extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: null,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });

    if (!this.state.data) {
      relayStore
        .fetch({
          query: Relay.QL`query {
            viewer {
              category(filter: $filter) {
                ${Category.getFragment('category')}
              }
            }
          }`,
          variables: {
            filter: { categoryID: this.props.id },
          },
        })
        .then((res) => {
          this.setState({ data: res.category });
        });
    }
  }

  render() {
    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          data-id={this.props.id}
          children={this.state.isOpen ? 'close' : 'open'}
        />
        { this.state.isOpen && (
          this.state.data
          ? <div className="lrspace bspace">
            <Category category={this.state.data} />
          </div>
          : <Loading />
        )}
      </span>
    );
  }
}
