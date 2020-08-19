import { Connection, createConnection } from 'typeorm';

export const getDbConnection = async (): Promise<Connection> => createConnection({
  name: process.env.PG_CONNECTION_NAME || 'default',
  type: 'postgres',
  host: process.env.PG_HOST || '127.0.0.1',
  port: Number(process.env.PG_PORT) || 5432,
  username: process.env.PG_USERNAME || 'postgres',
  password: process.env.PG_PASSWORD || '1q2w3e',
  database: process.env.PG_DB_NAME || 'postgres',
  schema: process.env.PG_SCHEMA || 'sky',
  synchronize: false,
  entities: [`${__dirname}/entities/*.js`],
});
