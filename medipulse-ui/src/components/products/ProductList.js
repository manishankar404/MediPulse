import React, { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../../api/api';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await fetchProducts();
      setProducts(res.data);
    } catch (err) {
      alert('Error fetching products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch {
      alert('Failed to delete');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 && <p>No products found</p>}
      <ul>
        {products.map(({ _id, name, brand, category, price }) => (
          <li key={_id}>
            <strong>{name}</strong> - {brand} - {category} - ${price}
            <button onClick={() => handleDelete(_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
