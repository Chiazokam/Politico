/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';
import db from './db';
import 'babel-polyfill';

dotenv.config();

const dropTables = async () => {
  await db.none(`BEGIN;
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS parties CASCADE;
        DROP TABLE IF EXISTS offices CASCADE;
        DROP TABLE IF EXISTS candidates CASCADE;
        DROP TABLE IF EXISTS votes;
        DROP TABLE IF EXISTS petitions;
        COMMIT;`
  ).catch(err => console.log(err));
};

dropTables();
