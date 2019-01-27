/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import pg from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  host: process.env.HOST,
  port: process.env.DB_PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const connectionString = process.env.DATABASE_URL || config;
const pgProm = pg();

const db = pgProm(connectionString);

export default db;
