import React, { PropTypes } from 'react';
import Relay from 'react-relay';

class Category extends React.Component {
  static propTypes = {
    category: PropTypes.object.isRequired,
  };

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
