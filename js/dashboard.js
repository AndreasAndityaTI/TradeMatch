// dashboard.js - Dashboard functionality with API integration

class Dashboard {
  constructor() {
    this.api = window.tradeMatchAPI || new TradeMatchAPI();
    this.currentUser = null;
  }

  async init() {
    try {
      // Check authentication
      const isAuth = await this.api.checkAuth();
      if (!isAuth) {
        window.location.href = 'login.html';
        return;
      }

      // Load dashboard data
      await this.loadDashboardData();
      this.setupEventListeners();
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
      window.location.href = 'login.html';
    }
  }

  async loadDashboardData() {
    try {
      const profileData = await this.api.getProfile();
      this.currentUser = profileData.user;

      const matchesData = await this.api.getMatches();
      const messagesData = await this.api.getMessages({ limit: 100 });
      const productsData = await this.api.getMyProducts();

      // Update UI
      this.updateUserGreeting();
      this.updateStats({
        matches: matchesData.matches.length,
        unreadMessages: messagesData.messages.filter(m => !m.is_read).length,
        products: productsData.products.length,
      });

      // Store data for later use
      this.dashboardData = {
        matches: matchesData.matches,
        messages: messagesData.messages,
        products: productsData.products,
      };
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      throw error;
    }
  }

  updateUserGreeting() {
    const nameElement = document.getElementById('userName');
    if (nameElement) {
      nameElement.textContent = this.currentUser.full_name || this.currentUser.username;
    }
  }

  updateStats(stats) {
    this.animateCounter('matchCount', stats.matches);
    this.animateCounter('messageCount', stats.unreadMessages);
    this.animateCounter('productCount', stats.products);
  }

  animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    if (!element) return;

    let current = 0;
    const increment = Math.max(1, target / 30);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  }

  setupEventListeners() {
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.logout();
      });
    }
  }

  logout() {
    this.api.logout();
    window.location.href = '../index.html';
  }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
  const dashboard = new Dashboard();
  dashboard.init();
});