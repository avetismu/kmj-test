import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({path : './.development.env'});

console.log('process.env.DB_HOST', process.env.DB_HOST);
console.log('process.env.DB_PORT', process.env.DB_PORT);
console.log('process.env.DB_USERNAME', process.env.DB_USERNAME);


export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        ssl: {
          ca: process.env.SSL_CERT,
        },
        entities: [
            __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true,
        //logging: true,
      });

      return dataSource.initialize();
    },
  },
];