const API_URL = import.meta.env.VITE_API_URL;

export const fetchAllPages = async (url) => {
  let page = 1;
  let allData = [];
  let pageCount = 1;

  do {
    const separator = url.includes('?') ? '&' : '?';
    const response = await fetch(`${url}${separator}pagination[page]=${page}&pagination[pageSize]=100`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || 'Failed to fetch data');
    allData = allData.concat(data.data);
    pageCount = data.meta?.pagination?.pageCount ?? 1;
    page++;
  } while (page <= pageCount);

  return allData;
};

export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_URL}/api/create-accounts/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Login failed');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/create-accounts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Email: userData.email,
            Number: userData.phoneNumber,
            Password: userData.password,
            ConfirmPassword: userData.confirmPassword,
            AgreeOrNot: userData.agreeOrNot,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Registration failed');
      }

      return {
        user: data.data,
        message: 'Registration successful',
      };
    } catch (error) {
      throw error;
    }
  },

  updateProfile: async (userData) => {
    try {
      const response = await fetch(`${API_URL}/api/create-accounts/${userData.documentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            FirstName: userData.firstName,
            LastName: userData.lastName,
            Email: userData.email,
            Number: userData.phone,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Update failed');
      }

      return { user: data.data };
    } catch (error) {
      throw error;
    }
  },
};

export const productsAPI = {
  getAll: async () => {
    try {
      const allProducts = await fetchAllPages(`${API_URL}/api/products?populate=*`);

      return allProducts.map(product => ({
        id: product.id,
        documentId: product.documentId,
        name: product.Name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
        image: product.ProductImage?.url ? `${API_URL}${product.ProductImage.url}` : null,
        images: product.ProductImages?.length > 0 
          ? product.ProductImages.map(img => `${API_URL}${img.url}`)
          : product.ProductImage?.url ? [`${API_URL}${product.ProductImage.url}`] : [],
        category: product.category?.name || 'Uncategorized'
      }));
    } catch (error) {
      throw error;
    }
  },

  getById: async (documentId) => {
    try {
      const response = await fetch(`${API_URL}/api/products/${documentId}?populate=*`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to fetch product');
      }

      const product = data.data;
      return {
        id: product.id,
        documentId: product.documentId,
        name: product.Name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
        image: product.ProductImage?.url ? `${API_URL}${product.ProductImage.url}` : null,
        images: product.ProductImages?.length > 0 
          ? product.ProductImages.map(img => `${API_URL}${img.url}`)
          : product.ProductImage?.url ? [`${API_URL}${product.ProductImage.url}`] : [],
        category: product.category?.name || 'Uncategorized'
      };
    } catch (error) {
      throw error;
    }
  },
};

export const categoriesAPI = {
  getAll: async () => {
    try {
      const allCategories = await fetchAllPages(`${API_URL}/api/categories`);
      return [{ id: 0, name: 'All' }, ...allCategories.map(cat => ({ id: cat.id, name: cat.name }))];
    } catch (error) {
      throw error;
    }
  },
};