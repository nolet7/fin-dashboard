// Re-export from the new centralized db module
export { default, query, getClient } from './db';

// Legacy compatibility
export const testConnection = async () => {
  try {
    const { query } = await import('./db');
    const result = await query('SELECT NOW()');
    console.log('Database connected successfully:', result.rows[0]);
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
};