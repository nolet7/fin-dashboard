import { query } from '../lib/database';

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

// Get all wallets for a user
export const getUserWallets = async (userId: number): Promise<Wallet[]> => {
  const result = await query(
    `SELECT w.id, w.user_id, w.balance, w.created_at, w.updated_at,
            c.code as currency_code, c.name as currency_name, 
            c.symbol as currency_symbol, c.flag_emoji
     FROM wallets w
     JOIN currencies c ON w.currency_id = c.id
     WHERE w.user_id = $1
     ORDER BY w.balance DESC`,
    [userId]
  );
  
  return result.rows.map(row => ({
    ...row,
    balance: parseFloat(row.balance)
  }));
};

// Create or update wallet balance
export const updateWalletBalance = async (
  userId: number, 
  currencyCode: string, 
  balance: number
): Promise<Wallet> => {
  const result = await query(
    `INSERT INTO wallets (user_id, currency_id, balance)
     VALUES ($1, (SELECT id FROM currencies WHERE code = $2), $3)
     ON CONFLICT (user_id, currency_id)
     DO UPDATE SET balance = $3, updated_at = CURRENT_TIMESTAMP
     RETURNING id, user_id, balance, created_at, updated_at`,
    [userId, currencyCode, balance]
  );
  
  // Get full wallet info with currency details
  const walletResult = await query(
    `SELECT w.id, w.user_id, w.balance, w.created_at, w.updated_at,
            c.code as currency_code, c.name as currency_name, 
            c.symbol as currency_symbol, c.flag_emoji
     FROM wallets w
     JOIN currencies c ON w.currency_id = c.id
     WHERE w.id = $1`,
    [result.rows[0].id]
  );
  
  return {
    ...walletResult.rows[0],
    balance: parseFloat(walletResult.rows[0].balance)
  };
};

// Get wallet by currency
export const getWalletByCurrency = async (
  userId: number, 
  currencyCode: string
): Promise<Wallet | null> => {
  const result = await query(
    `SELECT w.id, w.user_id, w.balance, w.created_at, w.updated_at,
            c.code as currency_code, c.name as currency_name, 
            c.symbol as currency_symbol, c.flag_emoji
     FROM wallets w
     JOIN currencies c ON w.currency_id = c.id
     WHERE w.user_id = $1 AND c.code = $2`,
    [userId, currencyCode]
  );
  
  if (result.rows.length === 0) return null;
  
  return {
    ...result.rows[0],
    balance: parseFloat(result.rows[0].balance)
  };
};

// Get total portfolio value in USD
export const getPortfolioValue = async (userId: number): Promise<number> => {
  // This would need exchange rates to convert to USD
  // For now, return sum of all balances (simplified)
  const result = await query(
    `SELECT SUM(w.balance) as total_value
     FROM wallets w
     WHERE w.user_id = $1`,
    [userId]
  );
  
  return parseFloat(result.rows[0].total_value || '0');
};