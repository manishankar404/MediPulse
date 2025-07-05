import React, { useEffect, useState } from 'react';
import { PRODUCT_API, BATCH_API, SALE_API, REORDER_API } from '../../routes';

function SalesForm({ onSaleRecorded }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products for dropdown
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(PRODUCT_API);
        const data = await res.json();
        setProducts(data);
        if (data.length > 0) setSelectedProduct(data[0]._id);
      } catch (err) {
        setError('Failed to load products');
      }
    }
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(SALE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product: selectedProduct, quantity }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Sale recording failed');
      }

      const result = await res.json();
      setQuantity(1);
      onSaleRecorded(result.sale);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light">
      <h5>Record a Sale</h5>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="productSelect" className="form-label">Product</label>
        <select
          id="productSelect"
          className="form-select"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          required
        >
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name} ({p.unit})
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="quantityInput" className="form-label">Quantity</label>
        <input
          id="quantityInput"
          type="number"
          className="form-control"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Processing...' : 'Record Sale'}
      </button>
    </form>
  );
}

export default SalesForm;
