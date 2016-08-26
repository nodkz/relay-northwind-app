import React from 'react';

export default function OrderHeaders({ count }) {
  if (!count) {
    return <h3>Nothing found! But it is no reason to be upset ;)</h3>;
  }

  return (
    <div>
      <h3>Total {count} records</h3>
      <div className="row">
        <div className="col-sm-1"><b>OrderID</b></div>
        <div className="col-sm-2"><b>Customer</b></div>
        <div className="col-sm-2"><b>Employee</b></div>
        <div className="col-sm-2"><b>Shipper</b></div>
        <div className="col-sm-2"><b>Order date</b></div>
        <div className="col-sm-2"><b>Freight</b></div>
      </div>
      <hr />
    </div>
  );
}

OrderHeaders.propTypes = {
  count: React.PropTypes.number,
};
