import { query } from '../lib/database';

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

// Get all exchange rates
export const getExchangeRates = async (): Promise<ExchangeRate[]> => {
  const result = await query(
    `SELECT er.*, 
            fc.code as from_currency_code, fc.symbol as from_currency_symbol, fc.flag_emoji as from_flag,
            tc.code as to_currency_code, tc.symbol as to_currency_symbol, tc.flag_emoji as to_flag
     FROM exchange_rates er
     JOIN currencies fc ON er.from_currency_id = fc.id
     JOIN currencies tc ON er.to_currency_id = tc.id
     ORDER BY er.updated_at DESC`
  );
  
  return result.rows.map(row => ({
    ...row,
    rate: parseFloat(row.rate),
    change_24h: parseFloat(row.change_24h),
    change_percent: parseFloat(row.change_percent),
    high_24h: row.high_24h ? parseFloat(row.high_24h) : undefined,
    low_24h: row.low_24h ? parseFloat(row.low_24h) : undefined
  }));
};

// Get specific exchange rate
export const getExchangeRate = async (
  fromCurrency: string, 
  toCurrency: string
): Promise<ExchangeRate | null> => {
  const result = await query(
    `SELECT er.*, 
            fc.code as from_currency_code, fc.symbol as from_currency_symbol, fc.flag_emoji as from_flag,
            tc.code as to_currency_code, tc.symbol as to_currency_symbol, tc.flag_emoji as to_flag
     FROM exchange_rates er
     JOIN currencies fc ON er.from_currency_id = fc.id
     JOIN currencies tc ON er.to_currency_id = tc.id
     WHERE fc.code = $1 AND tc.code = $2`,
    [fromCurrency, toCurrency]
  );
  
  if (result.rows.length === 0) return null;
  
  const row = result.rows[0];
  return {
    ...row,
    rate: parseFloat(row.rate),
    change_24h: parseFloat(row.change_24h),
    change_percent: parseFloat(row.change_percent),
    high_24h: row.high_24h ? parseFloat(row.high_24h) : undefined,
    low_24h: row.low_24h ? parseFloat(row.low_24h) : undefined
  };
};

// Update exchange rate
export const updateExchangeRate = async (
  fromCurrency: string,
  toCurrency: string,
  rate: number,
  change24h?: number,
  changePercent?: number,
  high24h?: number,
  low24h?: number
): Promise<ExchangeRate> => {
  const result = await query(
    `INSERT INTO exchange_rates (from_currency_id, to_currency_id, rate, change_24h, change_percent, high_24h, low_24h)
     VALUES (
       (SELECT id FROM currencies WHERE code = $1),
       (SELECT id FROM currencies WHERE code = $2),
       $3, $4, $5, $6, $7
     )
     ON CONFLICT (from_currency_id, to_currency_id)
     DO UPDATE SET 
       rate = $3,
       change_24h = $4,
       change_percent = $5,
       high_24h = $6,
       low_24h = $7,
       updated_at = CURRENT_TIMESTAMP
     RETURNING *`,
    [fromCurrency, toCurrency, rate, change24h || 0, changePercent || 0, high24h, low24h]
  );
  
  // Get full rate info with currency details
  const rateResult = await query(
    `SELECT er.*, 
            fc.code as from_currency_code, fc.symbol as from_currency_symbol, fc.flag_emoji as from_flag,
            tc.code as to_currency_code, tc.symbol as to_currency_symbol, tc.flag_emoji as to_flag
     FROM exchange_rates er
     JOIN currencies fc ON er.from_currency_id = fc.id
     JOIN currencies tc ON er.to_currency_id = tc.id
     WHERE er.id = $1`,
    [result.rows[0].id]
  );
  
  const row = rateResult.rows[0];
  return {
    ...row,
    rate: parseFloat(row.rate),
    change_24h: parseFloat(row.change_24h),
    change_percent: parseFloat(row.change_percent),
    high_24h: row.high_24h ? parseFloat(row.high_24h) : undefined,
    low_24h: row.low_24h ? parseFloat(row.low_24h) : undefined
  };
};

// Convert amount between currencies
export const convertCurrency = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number
): Promise<{ convertedAmount: number; rate: number } | null> => {
  const rate = await getExchangeRate(fromCurrency, toCurrency);
  
  if (!rate) return null;
  
  return {
    convertedAmount: amount * rate.rate,
    rate: rate.rate
  };
};