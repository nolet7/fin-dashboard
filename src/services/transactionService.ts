import { query } from '../lib/database';

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

export interface CreateTransactionData {
  user_id: number;
  type: Transaction['type'];
  amount: number;
  currency_code: string;
  recipient_name?: string;
  recipient_email?: string;
  location?: string;
  country_flag?: string;
  category?: string;
  reference?: string;
  fee?: number;
  exchange_rate?: number;
}

// Get user transactions with pagination
export const getUserTransactions = async (
  userId: number,
  limit: number = 50,
  offset: number = 0,
  status?: string
): Promise<Transaction[]> => {
  let queryText = `
    SELECT t.*, c.code as currency_code, c.symbol as currency_symbol
    FROM transactions t
    JOIN currencies c ON t.currency_id = c.id
    WHERE t.user_id = $1
  `;
  
  const params = [userId];
  let paramCount = 2;
  
  if (status && status !== 'all') {
    queryText += ` AND t.status = $${paramCount++}`;
    params.push(status);
  }
  
  queryText += ` ORDER BY t.created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount}`;
  params.push(limit, offset);
  
  const result = await query(queryText, params);
  
  return result.rows.map(row => ({
    ...row,
    amount: parseFloat(row.amount),
    fee: parseFloat(row.fee),
    exchange_rate: row.exchange_rate ? parseFloat(row.exchange_rate) : undefined
  }));
};

// Create a new transaction
export const createTransaction = async (data: CreateTransactionData): Promise<Transaction> => {
  const result = await query(
    `INSERT INTO transactions (
      user_id, type, amount, currency_id, recipient_name, recipient_email,
      location, country_flag, category, reference, fee, exchange_rate
    ) VALUES (
      $1, $2, $3, (SELECT id FROM currencies WHERE code = $4), 
      $5, $6, $7, $8, $9, $10, $11, $12
    ) RETURNING *`,
    [
      data.user_id, data.type, data.amount, data.currency_code,
      data.recipient_name, data.recipient_email, data.location,
      data.country_flag, data.category, data.reference,
      data.fee || 0, data.exchange_rate
    ]
  );
  
  // Get full transaction with currency info
  const transactionResult = await query(
    `SELECT t.*, c.code as currency_code, c.symbol as currency_symbol
     FROM transactions t
     JOIN currencies c ON t.currency_id = c.id
     WHERE t.id = $1`,
    [result.rows[0].id]
  );
  
  const transaction = transactionResult.rows[0];
  return {
    ...transaction,
    amount: parseFloat(transaction.amount),
    fee: parseFloat(transaction.fee),
    exchange_rate: transaction.exchange_rate ? parseFloat(transaction.exchange_rate) : undefined
  };
};

// Update transaction status
export const updateTransactionStatus = async (
  transactionId: number,
  status: Transaction['status']
): Promise<Transaction> => {
  const result = await query(
    `UPDATE transactions 
     SET status = $1, updated_at = CURRENT_TIMESTAMP 
     WHERE id = $2 
     RETURNING *`,
    [status, transactionId]
  );
  
  // Get full transaction with currency info
  const transactionResult = await query(
    `SELECT t.*, c.code as currency_code, c.symbol as currency_symbol
     FROM transactions t
     JOIN currencies c ON t.currency_id = c.id
     WHERE t.id = $1`,
    [result.rows[0].id]
  );
  
  const transaction = transactionResult.rows[0];
  return {
    ...transaction,
    amount: parseFloat(transaction.amount),
    fee: parseFloat(transaction.fee),
    exchange_rate: transaction.exchange_rate ? parseFloat(transaction.exchange_rate) : undefined
  };
};

// Get transaction statistics
export const getTransactionStats = async (userId: number) => {
  const result = await query(
    `SELECT 
      SUM(CASE WHEN type = 'sent' THEN amount ELSE 0 END) as total_sent,
      SUM(CASE WHEN type = 'received' THEN amount ELSE 0 END) as total_received,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_count,
      SUM(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN amount ELSE 0 END) as this_month
     FROM transactions 
     WHERE user_id = $1`,
    [userId]
  );
  
  const stats = result.rows[0];
  return {
    total_sent: parseFloat(stats.total_sent || '0'),
    total_received: parseFloat(stats.total_received || '0'),
    pending_count: parseInt(stats.pending_count || '0'),
    this_month: parseFloat(stats.this_month || '0')
  };
};