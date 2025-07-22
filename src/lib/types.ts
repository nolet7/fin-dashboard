// Global type definitions for FinanceHub

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  symbol: string;
  flag_emoji: string;
}

export interface Wallet {
  id: number;
  user_id: number;
  currency_code: string;
  currency_name: string;
  currency_symbol: string;
  flag_emoji: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface Transaction {
  id: number;
  user_id: number;
  type: 'sent' | 'received' | 'exchange' | 'deposit' | 'withdrawal';
  amount: number;
  currency_code: string;
  currency_symbol: string;
  recipient_name?: string;
  recipient_email?: string;
  location?: string;
  country_flag?: string;
  category?: string;
  reference?: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  fee: number;
  exchange_rate?: number;
  created_at: Date;
  updated_at: Date;
}

export interface ExchangeRate {
  id: number;
  from_currency_code: string;
  to_currency_code: string;
  from_currency_symbol: string;
  to_currency_symbol: string;
  from_flag: string;
  to_flag: string;
  rate: number;
  change_24h: number;
  change_percent: number;
  high_24h?: number;
  low_24h?: number;
  updated_at: Date;
}

export interface PaymentMethod {
  id: number;
  user_id: number;
  type: 'card' | 'bank_account' | 'paypal';
  card_type?: string;
  last_four?: string;
  expiry_month?: number;
  expiry_year?: number;
  is_default: boolean;
  created_at: Date;
}

export interface UserSettings {
  id: number;
  user_id: number;
  theme: 'light' | 'dark' | 'system';
  default_currency_id: number;
  language: string;
  timezone: string;
  email_notifications: boolean;
  push_notifications: boolean;
  transaction_alerts: boolean;
  rate_updates: boolean;
  security_alerts: boolean;
  marketing_updates: boolean;
  created_at: Date;
  updated_at: Date;
}