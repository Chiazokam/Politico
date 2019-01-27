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
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS parties;
        DROP TABLE IF EXISTS offices;
        DROP TABLE IF EXISTS candidates;
        DROP TABLE IF EXISTS votes;
        DROP TABLE IF EXISTS petitions;
        COMMIT;`
  ).catch(err => console.log(err));
};

dropTables();
