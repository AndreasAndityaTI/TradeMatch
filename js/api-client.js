/**
 * TradeMatch API Client
 * Frontend utility for interacting with the backend API
 */

const API_BASE_URL = 'http://localhost:3000';

class TradeMatchAPI {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = this.getToken();
  }

  /**
   * Store token in localStorage
   */
  setToken(token) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('tradematch_token', token);
      this.token = token;
    }
  }

  /**
   * Get token from localStorage
   */
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tradematch_token');
    }
    return null;
  }

  /**
   * Remove token from localStorage
   */
  clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('tradematch_token');
      this.token = null;
    }
  }

  /**
   * Generic fetch wrapper
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token && !options.skipAuth) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error: ${endpoint}`, error);
      throw error;
    }
  }

  // ===== Authentication =====

  async register(email, password, username, full_name, user_type = 'both') {
    const data = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, full_name, user_type }),
      skipAuth: true,
    });
    if (data.token) {
      this.setToken(data.token);
    }
    return data;
  }

  async login(email, password) {
    console.log('API login called with:', email);
    const data = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
    console.log('API login response:', data);
    if (data.token) {
      console.log('Setting token:', data.token.substring(0, 20) + '...');
      this.setToken(data.token);
    }
    return data;
  }

  logout() {
    this.clearToken();
  }

  // ===== User Profile =====

  async getProfile() {
    return this.request('/api/users/profile', { method: 'GET' });
  }

  async updateProfile(updates) {
    return this.request('/api/users/profile', {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async getUserProfile(userId) {
    return this.request(`/api/users/${userId}`, { method: 'GET' });
  }

  // ===== Products =====

  async getMyProducts() {
    return this.request('/api/products', { method: 'GET' });
  }

  async createProduct(product) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async getProduct(productId) {
    return this.request(`/api/products/${productId}`, { method: 'GET' });
  }

  async updateProduct(productId, updates) {
    return this.request(`/api/products/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteProduct(productId) {
    return this.request(`/api/products/${productId}`, { method: 'DELETE' });
  }

  async browseProducts(options = {}) {
    const { category, search, limit = 20, offset = 0 } = options;
    const params = new URLSearchParams({ limit, offset });

    if (category) params.append('category', category);
    if (search) params.append('search', search);

    return this.request(`/api/products/browse?${params}`, {
      method: 'GET',
      skipAuth: true,
    });
  }

  // ===== Matches =====

  async getMatches() {
    return this.request('/api/matches', { method: 'GET' });
  }

  async createMatch(other_user_id, product_id = null, match_type = 'interest') {
    return this.request('/api/matches', {
      method: 'POST',
      body: JSON.stringify({ other_user_id, product_id, match_type }),
    });
  }

  async updateMatchStatus(matchId, status) {
    return this.request(`/api/matches/${matchId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // ===== Messages =====

  async getMessages(options = {}) {
    const { match_id, limit = 50, offset = 0 } = options;
    const params = new URLSearchParams({ limit, offset });

    if (match_id) params.append('match_id', match_id);

    return this.request(`/api/messages?${params}`, { method: 'GET' });
  }

  async sendMessage(receiver_id, message_text, match_id = null) {
    return this.request('/api/messages', {
      method: 'POST',
      body: JSON.stringify({ receiver_id, message_text, match_id }),
    });
  }

  // ===== Ratings =====

  async getRatings(userId) {
    return this.request(`/api/ratings?user_id=${userId}`, {
      method: 'GET',
      skipAuth: true,
    });
  }

  async createRating(rated_user_id, rating, review = '', match_id = null) {
    return this.request('/api/ratings', {
      method: 'POST',
      body: JSON.stringify({ rated_user_id, rating, review, match_id }),
    });
  }

  // ===== Utility =====

  isAuthenticated() {
    return !!this.token;
  }

  async checkAuth() {
    try {
      await this.getProfile();
      return true;
    } catch {
      this.clearToken();
      return false;
    }
  }
}

// Export as singleton
if (typeof window !== 'undefined') {
  window.tradeMatchAPI = new TradeMatchAPI();
}
