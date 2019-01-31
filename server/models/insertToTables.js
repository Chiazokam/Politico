/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';
import db from './db';

import 'babel-polyfill';
dotenv.config();

const insertToTables = async () => {
  await db.none(`BEGIN;
    INSERT INTO users(firstname,
                      lastname,
                      othername ,
                      email,
                      phone,
                      passportUrl,
                      password,
                      isAdmin)
          VALUES('Winifred', 'Dollar', 'Karen' , 'winifred@karen.com', '+234-7045628456', 'www.passport/karen.com', 'karen', false),
                ('Darlene', 'Doll', 'Mary' , 'doll@mary.com', '+234-70455038456', 'www.passport/doll.com', 'mary', false),
                ('Mata', 'Dollarina', 'Czech' , 'mata@doll.com', '+234-70456903456', 'www.passport/dollarina.com', 'dollarina', false),
                ('Bowen', 'Dolsa', 'Meadow' , 'dolsa@bowen.com', '+234-70456209356', 'www.passport/dolsa.com', 'dolsa', false),
                ('Vanessa', 'Anessa', 'anessa' , 'anessa@karen.com', '+234-7045098456', 'www.passport/anessa.com', 'anessa', false),
                ('Donald', 'Donald', 'Donald' , 'Donald@mary.com', '+234-70453138456', 'www.passport/Donald.com', 'Donald', false),
                ('Abraham', 'Abraham', 'Abraham' , 'Abraham@doll.com', '+234-80456903456', 'www.passport/Abraham.com', 'Abraham', false),
                ('Marcel', 'Marcel', 'Marcel' , 'Marcel@bowen.com', '+234-70006209356', 'www.passport/Marcel.com', 'Marcel', false);
   
    INSERT INTO offices(name,
                        type)
        VALUES('President', 'Federal'),
              ('Lagos State Governor', 'State'),
              ('Prime Minister', 'Federal'),
              ('Chief Justice', 'Legislative');

    INSERT INTO parties(name,
                        hqAddress,
                        logoUrl)
        VALUES('All Peoples Party', 'Ibadan', 'app.jpg'),
              ('Gods Party', 'Surulere', 'gp.jpg'),
              ('Okay Party', 'Ikeja', 'op.jpg'),
              ('Damned Party', 'Mile 2', 'dp.jpg');

    INSERT INTO candidates(office,
                party,
                userId)
        VALUES(2, 2, 2),
            (2, 3, 3),
            (3, 4, 4),
            (3, 2, 5);

    INSERT INTO votes(office,
                    candidate,
                    voter)
        VALUES(2, 2, 6),
            (2, 1, 7),
            (2, 1, 4),
            (2, 1, 5),
            (2, 2, 8),
            (2, 1, 2),
            (3, 3, 3),
            (3, 4, 5),
            (3, 4, 7),
            (3, 4, 6);
    COMMIT;
    `).catch(console.log);
};

insertToTables();
