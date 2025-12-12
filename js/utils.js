/**
 * Validation utilities for form inputs
 */

export const Validators = {
  email: (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  password: (password) => {
    // At least 6 chars, 1 uppercase, 1 number
    return password.length >= 6 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  },

  username: (username) => {
    // 3-20 chars, alphanumeric and underscore
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
  },

  title: (title) => {
    return title && title.trim().length >= 3 && title.trim().length <= 200;
  },

  price: (price) => {
    return !isNaN(price) && parseFloat(price) > 0;
  },
};

/**
 * Format utilities for display
 */
export const Formatters = {
  price: (price, currency = 'USD') => {
    return `${currency} ${parseFloat(price).toFixed(2)}`;
  },

  date: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  },

  dateTime: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },

  rating: (rating) => {
    if (!rating) return 'No rating';
    return `${'★'.repeat(Math.round(rating))}${'☆'.repeat(5 - Math.round(rating))} (${rating.toFixed(1)})`;
  },

  truncate: (text, length = 100) => {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
  },
};

/**
 * Storage utilities
 */
export const Storage = {
  set: (key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },

  get: (key) => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
    return null;
  },

  remove: (key) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },

  clear: () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  },
};

/**
 * Error handling utilities
 */
export const ErrorHandler = {
  getErrorMessage: (error) => {
    if (error.message) {
      return error.message;
    }
    if (error.response && error.response.data) {
      return error.response.data.error || 'An error occurred';
    }
    return 'An unexpected error occurred';
  },

  handleApiError: (error, context = '') => {
    const message = ErrorHandler.getErrorMessage(error);
    console.error(`${context}: ${message}`);
    return message;
  },
};

/**
 * Notification utilities
 */
export const Notification = {
  show: (message, type = 'info', duration = 3000) => {
    // This would typically integrate with your UI framework
    // For now, just log to console
    console.log(`[${type.toUpperCase()}] ${message}`);

    if (typeof window !== 'undefined' && window.alert) {
      // Optional: show as alert for demo
      // window.alert(`${type}: ${message}`);
    }
  },

  success: (message) => Notification.show(message, 'success'),
  error: (message) => Notification.show(message, 'error'),
  warning: (message) => Notification.show(message, 'warning'),
  info: (message) => Notification.show(message, 'info'),
};
