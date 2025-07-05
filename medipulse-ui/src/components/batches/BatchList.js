import React, { useEffect, useState } from 'react';
import { fetchBatches, deleteBatch } from '../../api/api';

export default function BatchList() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBatches = async () => {
    try {
      setLoading(true);
      const res = await fetchBatches();
      setBatches(res.data);
    } catch (err) {
      alert('Error fetching batches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBatches();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this batch?')) return;
    try {
      await deleteBatch(id);
      loadBatches();
    } catch {
      alert('Failed to delete batch');
    }
  };

  if (loading) return <p>Loading batches...</p>;

  return (
    <div>
      <h2>Batches</h2>
      {batches.length === 0 && <p>No batches found</p>}
      <ul>
        {batches.map(({ _id, product, batchNumber, expiryDate, quantity }) => (
          <li key={_id}>
            <strong>{product?.name}</strong> - Batch: {batchNumber} - Qty: {quantity} - Expiry: {new Date(expiryDate).toLocaleDateString()}
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
