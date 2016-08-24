import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import { Link } from 'react-router';
import Category from './Category';

class CategoryList extends React.Component {
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
    const { categoryList = [] } = this.props;

    return (
      <div>
        { categoryList.map((category, i) => {
          return <Category key={i} category={category} />
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
