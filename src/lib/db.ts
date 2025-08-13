import { Pool, PoolConfig } from 'pg';

// Database configuration from environment variables
const requiredEnvVars = ['DB_HOST', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required database environment variables: ${missingVars.join(', ')}\n` +
    `Please ensure these are set in your .env file or Kubernetes Secret:\n` +
    `- DB_HOST: PostgreSQL server hostname/IP\n` +
    `- DB_NAME: Database name (usually 'financehub')\n` +
    `- DB_USER: Database username (usually 'admin')\n` +
    `- DB_PASSWORD: Database password\n\n` +
    `Connection string format: postgresql://${process.env.DB_USER || 'admin'}:<PASSWORD>@${process.env.DB_HOST || '<DB_HOST>'}:${process.env.DB_PORT || '5432'}/${process.env.DB_NAME || 'financehub'}`
  );
}

// Database connection configuration
const config: PoolConfig = {
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
};

// Create singleton connection pool
const pool = new Pool(config);

// Test database connection on startup
pool.on('connect', (client) => {
  console.log(`✅ Connected to PostgreSQL database: ${config.database}@${config.host}:${config.port}`);
});

pool.on('error', (err) => {
  console.error('❌ Unexpected error on idle client:', err);
  process.exit(-1);
});

// Test connection immediately
const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time, version() as pg_version');
    client.release();
    
    console.log('🔗 Database connection successful:');
    console.log(`   Time: ${result.rows[0].current_time}`);
    console.log(`   Version: ${result.rows[0].pg_version.split(' ')[0]} ${result.rows[0].pg_version.split(' ')[1]}`);
    console.log(`   Connection: postgresql://${config.user}@${config.host}:${config.port}/${config.database}`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:');
    console.error(`   Host: ${config.host}:${config.port}`);
    console.error(`   Database: ${config.database}`);
    console.error(`   User: ${config.user}`);
    console.error(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Verify database server is running and accessible');
    console.error('   2. Check network connectivity and firewall settings');
    console.error('   3. Confirm database credentials are correct');
    console.error('   4. Ensure database exists and user has proper permissions');
    
    throw error;
  }
};

// Test connection on module load
testConnection().catch(() => {
  console.error('🚨 Failed to establish database connection. Application will exit.');
  process.exit(1);
});

// Generic query function
export const query = async (text: string, params?: any[]) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Query executed:', { 
        text: text.substring(0, 100) + (text.length > 100 ? '...' : ''), 
        duration: `${duration}ms`, 
        rows: result.rowCount 
      });
    }
    
    return result;
  } catch (error) {
    console.error('❌ Database query error:', {
      query: text.substring(0, 200),
      params: params?.slice(0, 5), // Only log first 5 params for security
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
};

// Get a client from the pool for transactions
export const getClient = () => {
  return pool.connect();
};

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  console.log('✅ Database connections closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('🔄 Closing database connections...');
  await pool.end();
  console.log('✅ Database connections closed.');
  process.exit(0);
});

export default pool;