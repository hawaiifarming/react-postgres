import type { DatabaseConnection, ChartData } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export class DatabaseService {
  private connection: DatabaseConnection;

  constructor(connection: DatabaseConnection) {
    this.connection = connection;
    console.log('Database service initialized with connection:', connection.name);
  }

  async query(sql: string): Promise<ChartData[]> {
    try {
      console.log('🔍 Executing query:', sql);
      
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      console.log(`✅ Query executed successfully. Rows: ${result.rowCount}, Time: ${result.executionTime}ms`);
      return result.data;
    } catch (error) {
      console.error('❌ Database query error:', error);
      throw error;
    }
  }

  // Test if the API server is running
  async testApiConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
      return response.ok;
    } catch {
      return false;
    }
  }

  // Test the actual database connection through the API
  async testConnection(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      const response = await fetch(`${API_BASE_URL}/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.connection),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'API connection failed',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }
}

export const createDatabaseService = (connectionId: string): DatabaseService => {
  // Use the actual connection from config
  const connection = {
    id: connectionId,
    name: 'PostgreSQL Views',
    type: 'postgres' as const,
    host: '34.59.102.227',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'vujdgyfgkprmwevensmlzywpbrnmgosp',
    ssl: false,
  };
  
  return new DatabaseService(connection);
};
