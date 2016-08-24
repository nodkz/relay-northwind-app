import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import CategoryList from './CategoryList';


class CategoryListViewer extends React.Component {
  static propTypes = {
    viewer: PropTypes.object,
  };

  render() {
    return <CategoryList categoryList={this.props.viewer.categoryList} />;
  }
}

export default Relay.createContainer(CategoryListViewer, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on Viewer {
        categoryList {
          ${CategoryList.getFragment('categoryList')}
        }
      }
    `,
  },
});
