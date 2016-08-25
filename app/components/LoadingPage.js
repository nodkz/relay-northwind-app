import React, { PropTypes } from 'react';
import Loading from 'react-loading';

export default class LoadingPage extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div>
        <Loading type="bubbles" color="#3385b5" />

        <div>
          { this.props.children
            ? this.props.children
            : 'Пару секунд, загружаемся'
          }
        </div>
      </div>
    );
  }
}
