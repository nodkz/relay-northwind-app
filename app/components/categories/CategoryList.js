import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import Category from './Category';

class CategoryList extends React.Component {
  static propTypes = {
    categoryList: PropTypes.array.isRequired,
  };

  render() {
    const { categoryList = [] } = this.props;

    return (
      <div>
        { categoryList.map((category, i) => {
          return <Category key={i} category={category} />;
        })}
      </div>
    );
  }
}

export default Relay.createContainer(CategoryList, {
  fragments: {
    categoryList: () => Relay.QL`
      fragment on Category @relay(plural: true) {
        ${Category.getFragment('category')}
      }
    `,
  },
});
