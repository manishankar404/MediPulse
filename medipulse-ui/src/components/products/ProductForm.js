import React, { useState } from 'react';
import { createProduct } from '../../api/api';

export default function ProductForm({ onCreated }) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    category: '',
    price: '',
    reorderLevel: '',
    unit: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        reorderLevel: parseInt(form.reorderLevel, 10),
      });
      alert('Product created');
      setForm({ name: '', brand: '', category: '', price: '', reorderLevel: '', unit: '' });
      if (onCreated) onCreated();
    } catch {
      alert('Failed to create product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Product</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required />
      <input name="price" value={form.price} onChange={handleChange} type="number" step="0.01" placeholder="Price" required />
      <input name="reorderLevel" value={form.reorderLevel} onChange={handleChange} type="number" placeholder="Reorder Level" required />
      <input name="unit" value={form.unit} onChange={handleChange} placeholder="Unit (e.g. tablet)" required />
      <button type="submit">Save Product</button>
    </form>
  );
}
