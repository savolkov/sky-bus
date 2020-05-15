import { Connection, createConnection } from 'typeorm';

export const getDbConnection = async (): Promise<Connection> => {
  return createConnection();
}
