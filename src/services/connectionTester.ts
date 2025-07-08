import type { DatabaseConnection } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

export interface ConnectionTestResult {
  success: boolean;
  message: string;
  details?: {
    latency?: number;
    serverVersion?: string;
    error?: string;
  };
}

export class DatabaseConnectionTester {
  /**
   * Tests a database connection through the backend API
   */
  static async testConnection(connection: DatabaseConnection): Promise<ConnectionTestResult> {
    // Basic validation checks
    const validationErrors = this.validateConnection(connection);
    if (validationErrors.length > 0) {
      return {
        success: false,
        message: 'Connection validation failed',
        details: {
          error: validationErrors.join(', ')
        }
      };
    }

    try {
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}/test-connection`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(connection),
      });

      const result = await response.json();
      const latency = Date.now() - startTime;

      return {
        success: result.success,
        message: result.message,
        details: {
          latency,
          serverVersion: result.details?.serverVersion,
          error: result.details?.error
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'API connection failed',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  /**
   * Validates connection parameters
   */
  private static validateConnection(connection: DatabaseConnection): string[] {
    const errors: string[] = [];

    if (!connection.host?.trim()) {
      errors.push('Host is required');
    }

    if (!connection.database?.trim()) {
      errors.push('Database name is required');
    }

    if (!connection.user?.trim()) {
      errors.push('Username is required');
    }

    if (connection.port && (connection.port < 1 || connection.port > 65535)) {
      errors.push('Port must be between 1 and 65535');
    }

    // Basic host format validation
    if (connection.host) {
      const hostRegex = /^[a-zA-Z0-9.-]+$/;
      if (!hostRegex.test(connection.host)) {
        errors.push('Invalid host format');
      }
    }

    return errors;
  }

  /**
   * Tests a database connection with a simple query
   */
  static async testQuery(connection: DatabaseConnection, query: string = 'SELECT 1'): Promise<ConnectionTestResult> {
    const connectionTest = await this.testConnection(connection);
    
    if (!connectionTest.success) {
      return connectionTest;
    }

    try {
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql: query }),
      });

      const result = await response.json();
      const latency = Date.now() - startTime;

      return {
        success: result.success,
        message: result.success ? `Query executed successfully: "${query}"` : 'Query failed',
        details: {
          latency,
          error: result.error
        }
      };
    } catch (error) {
      return {
        success: false,
        message: 'Query execution failed',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }
}
