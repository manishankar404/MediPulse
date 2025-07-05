import React from 'react';

function ProductItem({ product }) {
  return (
    <div className="card product-card">
      <h4>{product.name}</h4>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Unit:</strong> {product.unit}</p>
      <p><strong>Price:</strong> ₹{product.price}</p>
      <p><strong>Reorder Level:</strong> {product.reorderLevel}</p>
    </div>
  );
}

export default ProductItem;
