import { ConnectionOptions } from 'typeorm/index';

export class EnvManager {
  static getDBConnectionSettings(): ConnectionOptions {
    return {
      name: process.env.PG_CONNECTION_NAME,
      type: 'postgres',
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USERNAME,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB_NAME,
      schema: process.env.PG_SCHEMA,
      synchronize: false,
      entities: [`${__dirname}/entities/*.js`],
    };
  }
}
