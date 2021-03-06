/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';
import db from './db';

import 'babel-polyfill';
dotenv.config();

const createTables = async () => {
   await db.none(`BEGIN;
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstname VARCHAR(128) NOT NULL,
      lastname VARCHAR(128) NOT NULL,
      othername VARCHAR(128) NOT NULL,
      email VARCHAR(128) UNIQUE NOT NULL,
      phone VARCHAR(128) UNIQUE NOT NULL,
      passportUrl VARCHAR(128) UNIQUE NOT NULL,
      password VARCHAR(128) NOT NULL,
      isAdmin BOOLEAN DEFAULT false
    ); 

    CREATE TABLE IF NOT EXISTS parties( 
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        hqAddress VARCHAR(128) NOT NULL,
        logoUrl VARCHAR(128) UNIQUE NOT NULL,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS offices( 
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        type VARCHAR(128) NOT NULL,
        createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS interests( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        party INT REFERENCES parties(id) ON DELETE CASCADE,
        userId INT REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidates( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        party INT REFERENCES parties(id) ON DELETE CASCADE,
        userId INT REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS votes( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        candidate INT REFERENCES candidates(id) ON DELETE CASCADE,
        voter INT REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS petitions( 
        id SERIAL PRIMARY KEY,
        office INT REFERENCES offices(id) ON DELETE CASCADE,
        createdBy INT REFERENCES users(id) ON DELETE CASCADE,
        text VARCHAR(128) NOT NULL,
        evidence VARCHAR(128) NOT NULL
    );
    COMMIT;`
  ).catch(console.log);

  await db.none(`BEGIN;
    INSERT INTO users(firstname,
                      lastname,
                      othername ,
                      email,
                      phone,
                      passportUrl,
                      password,
                      isAdmin)
          VALUES('Chiazokam', 'Echeta', 'Chioma' , 'chiazokamecheta@gmail.com', '07032425466', 'www.passport/chiazokam.com', '$2b$10$LAkfreG/ayNEne9.cnJnp.HnvjsJzraz/uN.Mcv4XIKzQxY.W6/fW', true);
    COMMIT;
    `).catch(console.log);
};

createTables();
