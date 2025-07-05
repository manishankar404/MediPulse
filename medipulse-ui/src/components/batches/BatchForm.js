import React, { useState, useEffect } from 'react';
import { fetchProducts, createBatch } from '../../api/api';

export default function BatchForm({ onCreated }) {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product: '',
    batchNumber: '',
    expiryDate: '',
    quantity: '',
  });

  useEffect(() => {
    async function loadProducts() {
      const res = await fetchProducts();
      setProducts(res.data);
    }
    loadProducts();
  }, []);

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createBatch({
        product: form.product,
        batchNumber: form.batchNumber,
        expiryDate: form.expiryDate,
        quantity: parseInt(form.quantity, 10),
      });
      alert('Batch created');
      setForm({ product: '', batchNumber: '', expiryDate: '', quantity: '' });
      if (onCreated) onCreated();
    } catch {
      alert('Failed to create batch');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Batch</h3>
      <select name="product" value={form.product} onChange={handleChange} required>
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>
      <input name="batchNumber" value={form.batchNumber} onChange={handleChange} placeholder="Batch Number" required />
      <input name="expiryDate" type="date" value={form.expiryDate} onChange={handleChange} required />
      <input name="quantity" type="number" value={form.quantity} onChange={handleChange} required min="0" />
      <button type="submit">Save Batch</button>
    </form>
  );
}
