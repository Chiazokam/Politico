/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import pg from 'pg-promise';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;


const connectionString = config[env].database;
const pgProm = pg();

const db = pgProm(connectionString);

export default db;
