import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  logout: () => api.post('/auth/logout'),
};

// Contracts API
export const contractsAPI = {
  getAll: () => api.get('/contracts'),
  getById: (id) => api.get(`/contracts/${id}`),
  create: (contractData) => api.post('/contracts', contractData),
  update: (id, contractData) => api.put(`/contracts/${id}`, contractData),
  delete: (id) => api.delete(`/contracts/${id}`),
  fundEscrow: (id, amount) => api.post(`/contracts/${id}/fund`, { amount }),
};

// Milestones API
export const milestonesAPI = {
  getByContract: (contractId) => api.get(`/contracts/${contractId}/milestones`),
  submitCompletion: (milestoneId, data) => api.post(`/milestones/${milestoneId}/submit`, data),
  approve: (milestoneId) => api.post(`/milestones/${milestoneId}/approve`),
  reject: (milestoneId, reason) => api.post(`/milestones/${milestoneId}/reject`, { reason }),
};

// Payments API
export const paymentsAPI = {
  getAll: () => api.get('/payments'),
  getByContract: (contractId) => api.get(`/payments/contract/${contractId}`),
  releaseFunds: (paymentId) => api.post(`/payments/${paymentId}/release`),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getAllProviders: () => api.get('/users/providers'),
  approveProvider: (id) => api.post(`/users/providers/${id}/approve`),
};

export default api;
