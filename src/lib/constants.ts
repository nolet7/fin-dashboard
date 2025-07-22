// Application constants

export const APP_NAME = 'FinanceHub';
export const APP_DESCRIPTION = 'Global Banking Platform';

// API Endpoints
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Currency codes
export const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY'
] as const;

// Transaction types
export const TRANSACTION_TYPES = [
  'sent', 'received', 'exchange', 'deposit', 'withdrawal'
] as const;

// Transaction statuses
export const TRANSACTION_STATUSES = [
  'pending', 'completed', 'failed', 'cancelled'
] as const;

// Theme options
export const THEME_OPTIONS = [
  'light', 'dark', 'system'
] as const;

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Validation constants
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_TRANSFER_AMOUNT = 50000;
export const MIN_TRANSFER_AMOUNT = 1;

// Animation durations (in seconds)
export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  user: 'financeHub_user',
  theme: 'financeHub_theme',
  settings: 'financeHub_settings',
} as const;