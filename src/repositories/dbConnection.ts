import { Connection, createConnection } from 'typeorm';

export const getDbConnection = async (): Promise<Connection> => createConnection({
  name: 'default',
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: '1q2w3e',
  database: 'postgres',
  schema: 'sky',
  synchronize: false,
  entities: [`${__dirname}/entities/*.js`],
});
