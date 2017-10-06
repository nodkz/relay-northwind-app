/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Category from './Category';
import type { Category_category } from './__generated__/Category_category.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?Category_category,
};

export default class ToggleCategory extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    data: null,
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });

    if (!this.state.data) {
      relayStore
        .fetch({
          query: graphql`
            query ToggleCategoryQuery($filter: FilterFindOneCategoryInput) {
              viewer {
                category(filter: $filter) {
                  ...Category_category
                }
              }
            }
          `,
          variables: {
            filter: { categoryID: this.props.id },
          },
        })
        .then(res => {
          this.setState({ data: res.category });
        });
    }
  };

  render() {
    return (
      <span>
        {' '}
        <Button
          bsSize="xsmall"
          bsStyle="info"
          onClick={this.toggle}
          data-id={this.props.id}
          children={this.state.isOpen ? 'close' : 'open'}
        />
        {this.state.isOpen &&
          (this.state.data ? (
            <div className="lrspace bspace">
              <Category category={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
