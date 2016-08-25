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
        <h1 onClick={this.onClick} style={{ userSelect: 'none', cursor: 'pointer' }}>
          {this.state.cnt}
        </h1>
        { this.props.message
          ? <Alert bsStyle="danger">{this.props.message}</Alert>
          : <p>
            То&nbsp;ли наш сервер повис, то&nbsp;ли у&nbsp;вас интернет говно.
            <br />
            В&nbsp;любом случае&nbsp;&mdash; жмите на&nbsp;кнопку!
          </p>
        }
        <Button onClick={this.reloadPage}>
          Перезагрузить страницу
        </Button>
      </Jumbotron>
    );
  }
}
