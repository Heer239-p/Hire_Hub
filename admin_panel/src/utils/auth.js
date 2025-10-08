// utils/auth.js

export const isAuthenticated = () => {
  // You can use localStorage, cookies, or any storage to keep auth status
  return !!localStorage.getItem('authToken');
};

export const login = (token) => {
  localStorage.setItem('authToken', token);
};

export const logout = () => {
  localStorage.removeItem('authToken');
};
