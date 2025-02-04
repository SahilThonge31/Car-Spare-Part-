export const API_BASE_URL = 'http://localhost:6000//api/m2/auth';  // User-related backend URL
export const PRODUCT_BASE_URL = 'http://localhost:4000/api/product'; // Product-related backend URL

// User Authentication Endpoints
export const REGISTER_URL = `${API_BASE_URL}/register`; // Registration Endpoint
export const LOGIN_URL = `${API_BASE_URL}/login`; // Login Endpoint
export const RESET_PASSWORD_URL = `${API_BASE_URL}/reset-password`; // Reset Password Endpoint
export const FORGOT_PASSWORD_URL = `${API_BASE_URL}/forgot-password`; // Forgot Password Endpoint