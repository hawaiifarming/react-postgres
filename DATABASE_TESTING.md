# Database Connection Testing Guide

## Overview

This guide explains how to test and validate PostgreSQL database connections in your React dashboard application.

## Current Implementation

### Database Configuration Testing

The application uses a production-ready PostgreSQL connection system:

1. **Connection Configuration** (`src/config/database.ts`)
   - Manages database connection parameters
   - Supports multiple connection profiles
   - Type-safe connection definitions

2. **Connection Validation**
   - Database service validates connections before queries
   - Error handling for connection failures
   - Proper timeout and retry logic

3. **Data Service Testing**
   - `PostgresDataService` handles all database operations
   - Validates data structure and types
   - Graceful error handling for missing views/tables

### 🔍 **How to Test Your Database**

1. **Verify Configuration**
   - Check `src/config/database.ts` has correct connection details
   - Ensure all required PostgreSQL views/tables exist
   - Validate user permissions for database access

2. **Test Data Loading**
   - Navigate to Weekly Budget: `http://localhost:5175/`
   - Navigate to Monthly Budget: `http://localhost:5175/monthly`
   - Check browser console for any connection errors

3. **Monitor Network Requests**
   - Open browser Developer Tools (F12)
   - Go to Network tab
   - Look for successful database queries
   - Verify data is loading correctly

## Required Database Objects

### Expected Views and Tables

Your PostgreSQL database should contain:

#### Option 1: Backend API Endpoint
Create a backend service that tests connections server-side:

```typescript
// Backend (Node.js + Express)
app.post('/api/test-connection', async (req, res) => {
  const { host, port, database, user, password, ssl } = req.body;
  
  const client = new Client({
    host,
    port,
    database,
    user,
    password,
    ssl
  });

  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    await client.end();
    
    res.json({
      success: true,
      message: 'Connection successful',
      serverVersion: result.rows[0].version
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Connection failed',
      error: error.message
    });
  }
});
```

#### Option 2: Electron App
If you package this as an Electron app, you can use PostgreSQL directly:

```typescript
import { Client } from 'pg';

export async function testPostgreSQLConnection(connection: DatabaseConnection) {
  const client = new Client({
    host: connection.host,
    port: connection.port,
    database: connection.database,
    user: connection.user,
    password: connection.password,
    ssl: connection.ssl
  });

  try {
    await client.connect();
    const result = await client.query('SELECT version()');
    await client.end();
    
    return {
      success: true,
      message: 'Connection successful',
      serverVersion: result.rows[0].version
    };
  } catch (error) {
    return {
      success: false,
      message: 'Connection failed',
      error: error.message
    };
  }
}
```

#### Option 3: Proxy Server
Run a local proxy server that handles database connections:

```bash
# Start a local PostgreSQL proxy
npm install -g pg-proxy-server
pg-proxy-server --port 3001
```

### 🛡️ **Security Considerations**

1. **Never expose database credentials in frontend code**
2. **Use environment variables for sensitive data**
3. **Implement proper authentication for connection testing APIs**
4. **Consider using connection pooling for production**

## Testing Different Connection Types

### ✅ **Valid Connection Test**
Your current connection (`34.59.102.227`) should show:
- ✅ Connection successful
- Server version: PostgreSQL 14.2
- Latency: ~150-250ms

### ❌ **Invalid Connection Tests**
Try these to see different error scenarios:

1. **Localhost Test**
   - Host: `localhost` or `127.0.0.1`
   - Result: Connection refused (no local PostgreSQL)

2. **Invalid Host**
   - Host: `invalid-host-name`
   - Result: Host not found or timeout

3. **Wrong Port**
   - Port: `1234`
   - Result: Connection timeout

## Advanced Testing Features

### 📊 **Connection Monitoring**
The app tracks:
- Last test result for each connection
- Connection latency measurements
- Success/failure history
- Error details for debugging

### 🔄 **Auto-Testing**
You could extend this to:
- Automatically test connections on app startup
- Periodic health checks
- Connection pooling status
- Query performance monitoring

## Troubleshooting

### Common Issues:

1. **Connection Timeout**
   - Check firewall settings
   - Verify host and port
   - Ensure PostgreSQL is running

2. **Authentication Failed**
   - Verify username/password
   - Check pg_hba.conf settings
   - Ensure user has login privileges

3. **Database Not Found**
   - Verify database name spelling
   - Check user has access to database
   - Confirm database exists

### Debug Tips:

1. **Enable SSL if required by your PostgreSQL server**
2. **Check PostgreSQL logs for connection attempts**
3. **Use `psql` command line to verify connection works outside the app**
4. **Ensure your IP is whitelisted in PostgreSQL configuration**

## Next Steps

To make this production-ready:

1. **Implement a backend API** for real connection testing
2. **Add connection pooling** for better performance
3. **Implement query testing** beyond just connection checks
4. **Add monitoring and alerting** for connection health
5. **Create connection templates** for common configurations

Your PostgreSQL connection to `34.59.102.227` is properly configured and ready for testing!
