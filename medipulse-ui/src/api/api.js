import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Products
export const fetchProducts = () => api.get('/products');
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Batches
export const fetchBatches = () => api.get('/batches');
export const createBatch = (data) => api.post('/batches', data);
export const updateBatch = (id, data) => api.put(`/batches/${id}`, data);
export const deleteBatch = (id) => api.delete(`/batches/${id}`);

// Sales
export const fetchSales = () => api.get('/sales');
export const createSale = (data) => api.post('/sales', data);

// Reorders
export const fetchReorders = () => api.get('/reorder');

export default api;
