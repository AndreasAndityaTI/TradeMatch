// Frontend Authentication Handler
const API_URL = 'http://localhost:3000';

class AuthHandler {
  constructor() {
    this.api = new TradeMatchAPI();
  }

  async handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const messageDiv = document.getElementById('registerMessage');
    
    try {
      const data = {
        full_name: document.getElementById('full_name').value,
        username: document.getElementById('username').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        user_type: document.getElementById('userType').value,
      };

      // Validation
      if (!data.full_name || !data.username || !data.email || !data.password || !data.user_type) {
        throw new Error('All fields are required');
      }

      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }

      if (!/[A-Z]/.test(data.password)) {
        throw new Error('Password must contain at least 1 uppercase letter');
      }

      if (!/[0-9]/.test(data.password)) {
        throw new Error('Password must contain at least 1 number');
      }

      const response = await this.api.register(
        data.email,
        data.password,
        data.username,
        data.full_name,
        data.user_type
      );

      messageDiv.innerHTML = '<p class="success-message">✓ Registration successful! Redirecting to dashboard...</p>';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (error) {
      messageDiv.innerHTML = `<p class="error-message">✗ ${error.message}</p>`;
    }
  }

  async handleLogin(e) {
    e.preventDefault();
    const messageDiv = document.getElementById('loginMessage');

    try {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      console.log('Attempting login with:', email);
      const response = await this.api.login(email, password);
      console.log('Login response:', response);

      messageDiv.innerHTML = '<p class="success-message">✓ Login successful! Redirecting...</p>';
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      messageDiv.innerHTML = `<p class="error-message">✗ ${error.message}</p>`;
    }
  }

  setupEventListeners() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    if (registerForm) {
      registerForm.addEventListener('submit', (e) => this.handleRegister(e));
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  const authHandler = new AuthHandler();
  authHandler.setupEventListeners();

  // Check if user is already logged in
  if (window.location.pathname.includes('dashboard')) {
    const api = new TradeMatchAPI();
    api.checkAuth().then(isAuth => {
      if (!isAuth) {
        window.location.href = 'login.html';
      }
    });
  }
});
