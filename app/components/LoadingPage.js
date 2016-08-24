import React, { PropTypes } from 'react';
import s from './LoadingPage.scss';
import Loader from 'app/_components/Loader';

export default class LoadingPage extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={s.root}>
        <Loader width="70px" height="100px" />

        <div className={s.message}>
          { this.props.children
            ? this.props.children
            : 'Пару секунд, загружаем всио'
          }
        </div>
      </div>
    );
  }
}
