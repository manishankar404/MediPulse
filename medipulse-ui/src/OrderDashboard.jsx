import React, { useEffect, useState } from 'react';
import Loader from './components/common/Loader';
import Notification from './components/common/Notification';
import SalesForm from './components/sales/SalesForm'; // import your SalesForm
import { PRODUCT_API, BATCH_API, SALE_API, REORDER_API } from './routes';

function OrderDashboard() {
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [sales, setSales] = useState([]);
  const [reorders, setReorders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Fetch all data function
  const fetchData = async () => {
    try {
      const [productRes, batchRes, saleRes, reorderRes] = await Promise.all([
        fetch(PRODUCT_API),
        fetch(BATCH_API),
        fetch(SALE_API),
        fetch(REORDER_API),
      ]);

      if (!productRes.ok || !batchRes.ok || !saleRes.ok || !reorderRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [productData, batchData, saleData, reorderData] = await Promise.all([
        productRes.json(),
        batchRes.json(),
        saleRes.json(),
        reorderRes.json(),
      ]);

      setProducts(productData);
      setBatches(batchData);
      setSales(saleData);
      setReorders(reorderData);
    } catch (err) {
      setNotification({ message: '⚠️ Failed to load data', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Refresh data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Called when a sale is recorded successfully in SalesForm
  const handleSaleRecorded = (newSale) => {
    setNotification({ message: '✅ Sale recorded successfully!', type: 'success' });
    fetchData(); // Refresh all data including batches & sales to reflect stock changes
  };

  if (loading) return <Loader />;

  return (
    <div className="container my-5">
      <Notification message={notification.message} type={notification.type} />

      <h2 className="mb-4">📊 MediPulse Inventory Dashboard</h2>

      {/* Sales Form */}
      <SalesForm products={products} onSaleRecorded={handleSaleRecorded} />

      {/* Products Table */}
      <h4>🧪 Products</h4>
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover">
          <thead className="table-info">
            <tr>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price (₹)</th>
              <th>Unit</th>
              <th>Reorder Level</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.brand}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.unit}</td>
                <td>{p.reorderLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Batches Table */}
      <h4>📦 Batches</h4>
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover">
          <thead className="table-warning">
            <tr>
              <th>Batch #</th>
              <th>Product</th>
              <th>Expiry</th>
              <th>Qty</th>
              <th>Purchase Date</th>
            </tr>
          </thead>
          <tbody>
            {batches.map(b => (
              <tr key={b._id}>
                <td>{b.batchNumber}</td>
                <td>{b.product?.name || '—'}</td>
                <td>{new Date(b.expiryDate).toLocaleDateString()}</td>
                <td>{b.quantity}</td>
                <td>{new Date(b.purchaseDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sales Table */}
      <h4>🧾 Sales History</h4>
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Product</th>
              <th>Qty Sold</th>
              <th>Sale Date</th>
            </tr>
          </thead>
          <tbody>
            {sales.length === 0 ? (
              <tr><td colSpan="3">No sales recorded.</td></tr>
            ) : (
              sales.map(s => (
                <tr key={s._id}>
                  <td>{s.product?.name || '—'}</td>
                  <td>{s.quantity}</td>
                  <td>{new Date(s.saleDate).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Reorders Table */}
      <h4>🔁 Reorders</h4>
      <div className="table-responsive mb-4">
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reorders.map(o => (
              <tr key={o._id}>
                <td>{o.product?.name || '—'}</td>
                <td>{o.orderQuantity}</td>
                <td>{o.status}</td>
                <td>{o.notes}</td>
                <td>{new Date(o.orderDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderDashboard;
