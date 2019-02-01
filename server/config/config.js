/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';

dotenv.load();

const config = {
    dev: {
        database: process.env.DATABASE_DEV_URL,
        port: process.env.PORT,
    },
    test: {
        database: process.env.DATABASE_TEST_URL,
        port: process.env.PORT,
    },
    production: {
        database: process.env.DATABASE_URL,
    }
};

export default config;
