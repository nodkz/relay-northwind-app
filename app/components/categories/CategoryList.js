import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Category from './Category';

class CategoryList extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return (
      <div>
        <h3>Total {this.props.viewer.categoryList.length} records</h3>

        { this.props.viewer.categoryList.map((category, i) =>
          <Category key={i} category={category} />
        )}
      </div>
    );
  }
}

export default Relay.createContainer(CategoryList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        categoryList {
          ${Category.getFragment('category')}
        }
      }
    `,
  },
});
