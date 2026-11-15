import apiClient from '../api/apiClient';

const authService = {
  login: async (email, password) => {
    const response = await apiClient.post('/auth/login', {
      email,
      password,
    });

    return response.data;
  },

  logout: () => {
    localStorage.removeItem('fitpod_token');
    localStorage.removeItem('fitpod_user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('fitpod_user');

    return user ? JSON.parse(user) : null;
  },

  getToken: () => {
    return localStorage.getItem('fitpod_token');
  },
};

export default authService;
