import React, { useEffect, useState } from 'react';
import { fetchReorders } from '../../api/api';

export default function ReorderList() {
  const [reorders, setReorders] = useState([]);
  const [loading,setLoading] = useState(true);

useEffect(() => {
const load = async () => {
try {
const res = await fetchReorders();
setReorders(res.data);
} catch {
alert('Failed to fetch reorders');
} finally {
setLoading(false);
}
};
load();
}, []);

if (loading) return <p>Loading...</p>;

return (
<div>
<h3>Reorder Suggestions</h3>
{reorders.length === 0 ? (
<p>No pending reorders</p>
) : (
<ul>
{reorders.map(r => (
<li key={r._id}>
<strong>{r.product.name}</strong> - Qty: {r.orderQuantity} - Status: {r.status}
</li>
))}
</ul>
)}
</div>
);
}
