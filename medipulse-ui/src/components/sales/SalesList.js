import React from 'react';

function SalesList({ sales }) {
  return (
    <div>
      <h3>Sales History</h3>
      {sales.length === 0 ? <p>No sales recorded.</p> : (
        <ul className="sales-list">
          {sales.map((sale) => (
            <li key={sale._id}>
              {sale.quantity} units of {sale.product?.name || 'Unknown'} sold on {new Date(sale.saleDate).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SalesList;
