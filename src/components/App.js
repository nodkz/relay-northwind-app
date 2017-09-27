import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Menu from './Menu';

const s = {};

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className={s.root} style={{ paddingTop: '10px' }}>
        <Menu />
        {this.props.children}
      </div>
    );
  }
}

export default App;
