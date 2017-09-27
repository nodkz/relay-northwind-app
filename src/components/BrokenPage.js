import React, { PropTypes } from 'react';
import { Jumbotron, Button, Alert } from 'react-bootstrap';

export default class BrokenPage extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    message: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.reloadPage = this.reloadPage.bind(this);
  }

  reloadPage() {
    if (window) {
      window.location.reload(true);
    }
  }

  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1>
          {this.state.cnt}
          { this.props.message
            ? <Alert bsStyle="danger">{this.props.message}</Alert>
            : <span>Shit happens!</span>
          }
        </h1>
        <Button onClick={this.reloadPage}>Reload page</Button>
      </Jumbotron>
    );
  }
}
