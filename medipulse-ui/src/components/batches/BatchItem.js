import React from 'react';

function BatchItem({ batch }) {
  return (
    <div className="card batch-card">
      <h4>Batch: {batch.batchNumber}</h4>
      <p><strong>Product:</strong> {batch.product?.name || 'N/A'}</p>
      <p><strong>Expiry:</strong> {new Date(batch.expiryDate).toLocaleDateString()}</p>
      <p><strong>Qty:</strong> {batch.quantity}</p>
      <p><strong>Purchase Date:</strong> {new Date(batch.purchaseDate).toLocaleDateString()}</p>
    </div>
  );
}

export default BatchItem;
