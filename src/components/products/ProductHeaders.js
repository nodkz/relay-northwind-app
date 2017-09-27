import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

export default function ProductHeaders({ count, onCreating, isCreating }) {
  if (!count) {
    return <h3>Nothing found! But it is no reason to be upset ;)</h3>;
  }

  return (
    <div>
      <h3>Total {count} records</h3>
      {!isCreating && (
        <Button type="submit" bsStyle="primary" onClick={onCreating}>
          Create New Product
        </Button>
      )}
      <div className="row">
        <div className="col-sm-1">
          <b>ProductID</b>
        </div>
        <div className="col-sm-3">
          <b>Title</b>
        </div>
        <div className="col-sm-2">
          <b>Category</b>
        </div>
        <div className="col-sm-2">
          <b>Supplier</b>
        </div>
        <div className="col-sm-2">
          <b>Unit price</b>
        </div>
        <div className="col-sm-2">
          <b>InStock</b>
        </div>
      </div>
      <hr />
    </div>
  );
}

ProductHeaders.propTypes = {
  count: PropTypes.number,
};
