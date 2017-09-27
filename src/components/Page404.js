import React from 'react';
import { Jumbotron } from 'react-bootstrap';

class Page404 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cnt: 404 };
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.setState({ cnt: this.state.cnt + 1 });
  }
  render() {
    return (
      <Jumbotron style={{ textAlign: 'center' }}>
        <h1 onClick={this.onClick} style={{ userSelect: 'none', cursor: 'pointer' }}>
          {this.state.cnt}
        </h1>
        <p>
          Страница не найдена
        </p>
      </Jumbotron>
    );
  }
}

Page404.isNotFound = true; // due to withStyle decorator, we set up it outside, right before export
export default Page404;
