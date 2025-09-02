import { DataSource } from 'typeorm';
require('dotenv').config({ path: '../.env' });

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'db',
    port: parseInt(process.env.POSTGRES_PORT || '5440'),
    username: process.env.POSTGRES_USER || 'kopeika',
    password: process.env.POSTGRES_PASSWORD || 'kopeika',
    database: process.env.POSTGRES_DB || 'kopeika',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
});
