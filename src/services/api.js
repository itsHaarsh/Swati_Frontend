// Mock API service - no backend integration
export const authAPI = {
  login: async (credentials) => {
    // Mock login - always succeeds
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: {
        id: 'mock-user-1',
        email: credentials.email,
        firstName: 'Mock',
        lastName: 'User'
      },
      token: 'mock-jwt-token'
    };
  },
  
  register: async (userData) => {
    // Mock registration - always succeeds
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: {
        id: 'mock-user-' + Date.now(),
        ...userData
      },
      message: 'Registration successful'
    };
  },
};