import React from 'react';

function ReorderItem({ order }) {
  return (
    <div className="card reorder-card">
      <h4>Product: {order.product?.name}</h4>
      <p><strong>Quantity:</strong> {order.orderQuantity}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Notes:</strong> {order.notes}</p>
      <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
    </div>
  );
}

export default ReorderItem;
