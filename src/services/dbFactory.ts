import { DatabaseService } from './databaseService';
import { getConnection } from '../config/database';

export class DatabaseServiceFactory {
  private static instance: DatabaseService | null = null;

  static getService(): DatabaseService {
    if (!this.instance) {
      const connection = getConnection('postgres_views');
      if (!connection) {
        throw new Error('PostgreSQL connection not found');
      }
      this.instance = new DatabaseService(connection);
    }
    return this.instance;
  }

  static resetConnection() {
    this.instance = null;
  }
}

// Convenience function for direct database queries
export const queryDatabase = async (sql: string): Promise<any[]> => {
  const db = DatabaseServiceFactory.getService();
  return await db.query(sql);
};
