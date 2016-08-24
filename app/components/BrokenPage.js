import React, { PropTypes } from 'react';
import s from './BrokenPage.scss';
import SvgIcon from 'app/_components/SvgIcon';
import Button from 'app/_components/Form/Element/Button/Button';

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
      <div className={s.root}>
        <SvgIcon
          color="#95A5A6"
          width="70px"
          height="70px"
          filename="ic_error_outline_24px.svg"
        />

        <div className={s.message}>
          {this.props.children ?
            this.props.children
            :
            <div className={s.text}>
              <p className={s.title}>
                Что-то пошло не&nbsp;так
              </p>
              { this.props.message
                ? <p className={s.redNote}>{this.props.message}</p>
                : <p className={s.note}>
                  То&nbsp;ли наш сервер повис, то&nbsp;ли у&nbsp;вас интернет говно.
                  <br />
                  В&nbsp;любом случае&nbsp;&mdash; жмите на&nbsp;кнопку!
                </p>
              }
              <Button type="button" onClick={this.reloadPage} s={s} outline blue large>
                Перезагрузить страницу
              </Button>
            </div>
          }
        </div>
      </div>
    );
  }
}
