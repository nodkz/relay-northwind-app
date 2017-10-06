/* @flow */

import React from 'react';
import { graphql } from 'react-relay/compat';
import { Button } from 'react-bootstrap';
import Loading from 'components/Loading';
import { relayStore } from '../../clientStores';
import Employee from './Employee';
import type { ToggleEmployeeQueryResponse } from './__generated__/ToggleEmployeeQuery.graphql';

type Props = {
  id: number,
};

type State = {
  isOpen: boolean,
  data: ?ToggleEmployeeQueryResponse,
};

export default class ToggleEmployee extends React.Component<Props, State> {
  state: State = {
    isOpen: false,
    data: null,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });

    if (!this.state.data) {
      relayStore
        .fetch({
          query: graphql`
            query ToggleEmployeeQuery($filter: FilterFindOneEmployeeInput) {
              viewer {
                employee(filter: $filter) {
                  ...Employee_employee
                }
              }
            }
          `,
          variables: { filter: { employeeID: this.props.id } },
        })
        .then(res => {
          this.setState({
            data: res.employee,
          });
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
              <Employee employee={this.state.data} />
            </div>
          ) : (
            <Loading />
          ))}
      </span>
    );
  }
}
