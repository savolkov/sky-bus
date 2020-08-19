import { Connection, createConnection } from 'typeorm';

export const getDbConnection = async (): Promise<Connection> => createConnection({
  name: process.env.CONNECTION_NAME || 'default',
  type: 'postgres',
  host: process.env.HOST || '127.0.0.1',
  port: Number(process.env.PORT) || 5432,
  username: process.env.USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '1q2w3e',
  database: process.env.DATABASE || 'postgres',
  schema: process.env.SCHEMA || 'sky',
  synchronize: false,
  entities: [`${__dirname}/entities/*.js`],
});
