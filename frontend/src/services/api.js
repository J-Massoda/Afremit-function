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
  providerApply: (providerData) => api.post('/auth/provider/apply', providerData),
  verifyEmail: (token) => api.get(`/auth/verify-email/${token}`),
  resendVerification: () => api.post('/auth/resend-verification'),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
};

// KYC API
export const kycAPI = {
  submitUserKYC: (formData) => api.post('/kyc/user', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  submitProviderKYC: (formData) => api.post('/kyc/provider', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getStatus: () => api.get('/kyc/status'),
};

// Admin API
export const adminAPI = {
  // KYC Management
  getPendingKYC: () => api.get('/admin/kyc/pending'),
  getAllKYC: (params) => api.get('/admin/kyc', { params }),
  getKYCById: (kycId) => api.get(`/admin/kyc/${kycId}`),
  approveKYC: (kycId) => api.post(`/admin/kyc/${kycId}/approve`),
  rejectKYC: (kycId, reason) => api.post(`/admin/kyc/${kycId}/reject`, { reason }),
  
  // Milestone Management
  getPendingMilestones: () => api.get('/admin/milestones/pending'),
  approveMilestone: (milestoneId) => api.post(`/admin/milestones/${milestoneId}/approve`),
  rejectMilestone: (milestoneId, reason) => api.post(`/admin/milestones/${milestoneId}/reject`, { reason }),
  
  // Provider Management
  getAllProviders: (params) => api.get('/admin/providers', { params }),
  publishProvider: (providerId) => api.post(`/admin/providers/${providerId}/publish`),
  suspendUser: (userId, reason) => api.post(`/admin/users/${userId}/suspend`, { reason }),
  
  // Stats
  getStats: () => api.get('/admin/stats'),
};

// Construction API
export const constructionAPI = {
  requestQuote: (formData) => api.post('/construction/request-quote', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getMyQuotes: () => api.get('/construction/my-quotes'),
  getQuoteById: (quoteId) => api.get(`/construction/quotes/${quoteId}`),
  getAvailableQuotes: (params) => api.get('/construction/available-quotes', { params }),
  submitQuoteResponse: (formData) => api.post('/construction/quote-response', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  acceptResponse: (responseId) => api.post(`/construction/accept-response/${responseId}`),
};

// Providers API
export const providersAPI = {
  search: (params) => api.get('/providers', { params }),
  getById: (providerId) => api.get(`/providers/${providerId}`),
  getReviews: (providerId) => api.get(`/providers/${providerId}/reviews`),
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
