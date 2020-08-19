import { Connection, createConnection } from 'typeorm';
import { EnvManager } from '../types/EnvManager';

export const getDbConnection = async (): Promise<Connection> => createConnection(
  EnvManager.getDBConnectionSettings(),
);
