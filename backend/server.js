const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST || '34.59.102.227',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'postgres',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'vujdgyfgkprmwevensmlzywpbrnmgosp',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10, // Maximum number of connections in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection on startup
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database:', err);
  } else {
    console.log('✅ Connected to PostgreSQL database successfully');
    client.query('SELECT version()', (err, result) => {
      if (err) {
        console.error('Error executing test query:', err);
      } else {
        console.log('📊 Database version:', result.rows[0].version);
      }
      release();
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Test connection endpoint
app.post('/api/test-connection', async (req, res) => {
  const { host, port, database, user, password, ssl } = req.body;
  
  const testPool = new Pool({
    host,
    port,
    database,
    user,
    password,
    ssl: ssl ? { rejectUnauthorized: false } : false,
    max: 1,
    connectionTimeoutMillis: 5000,
  });

  try {
    const start = Date.now();
    const client = await testPool.connect();
    const result = await client.query('SELECT version()');
    const latency = Date.now() - start;
    
    client.release();
    await testPool.end();
    
    res.json({
      success: true,
      message: 'Connection successful',
      details: {
        serverVersion: result.rows[0].version,
        latency: latency
      }
    });
  } catch (error) {
    await testPool.end();
    res.json({
      success: false,
      message: 'Connection failed',
      details: {
        error: error.message
      }
    });
  }
});

// Execute SQL query endpoint
app.post('/api/query', async (req, res) => {
  const { sql, params = [] } = req.body;
  
  if (!sql) {
    return res.status(400).json({ error: 'SQL query is required' });
  }

  try {
    console.log('🔍 Executing query:', sql.substring(0, 100) + (sql.length > 100 ? '...' : ''));
    const start = Date.now();
    const result = await pool.query(sql, params);
    const executionTime = Date.now() - start;
    
    res.json({
      success: true,
      data: result.rows,
      rowCount: result.rowCount,
      executionTime: executionTime
    });
  } catch (error) {
    console.error('❌ Query error:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code
    });
  }
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error('💥 Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 PostgreSQL API server running on port ${port}`);
  console.log(`📊 Database: ${process.env.DB_HOST || '34.59.102.227'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'postgres'}`);
  console.log(`🔗 Health check: http://localhost:${port}/health`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await pool.end();
  process.exit(0);
});
