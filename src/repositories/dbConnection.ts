import { Connection, createConnection } from 'typeorm';
import { EnvManager } from '../utils/EnvManager';

const pgConnectionSettings = EnvManager.getDBConnectionSettings();
export const getDbConnection = async (): Promise<Connection> => createConnection(
  pgConnectionSettings,
);
