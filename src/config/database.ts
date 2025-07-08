import type { DatabaseConnection } from '../types';

export const defaultConnections: DatabaseConnection[] = [
  {
    id: 'postgres_views',
    name: 'PostgreSQL Views',
    type: 'postgres',
    host: '34.59.102.227',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'vujdgyfgkprmwevensmlzywpbrnmgosp',
    ssl: false,
  },
];

export const getConnection = (id: string): DatabaseConnection | undefined => {
  return defaultConnections.find(conn => conn.id === id);
};

export const addConnection = (connection: DatabaseConnection): void => {
  const index = defaultConnections.findIndex(conn => conn.id === connection.id);
  if (index >= 0) {
    defaultConnections[index] = connection;
  } else {
    defaultConnections.push(connection);
  }
};

export const removeConnection = (id: string): void => {
  const index = defaultConnections.findIndex(conn => conn.id === id);
  if (index >= 0) {
    defaultConnections.splice(index, 1);
  }
};
