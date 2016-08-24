import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';

class Category extends React.Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick() {
    this.props.onItemClick(this.props.company._id);
  }

  render() {
    const { category = {} } = this.props;

    return (
      <div className="row">
        <div className="col-sm-1">{category.categoryID}</div>
        <div className="col-sm-5">{category.name}</div>
        <div className="col-sm-6">{category.description}</div>
      </div>
    );
  }
}

export default Relay.createContainer(Category, {
  fragments: {
    category: () => Relay.QL`
      fragment on Category {
        categoryID
        name
        description
      }
    `,
  },
});
