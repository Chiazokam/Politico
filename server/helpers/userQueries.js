/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class UserQueries {
    createUserQuery(object) {
        return db.any(`INSERT INTO users(firstname, lastname, othername, email, phone, passportUrl, password)
          VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            object.firstname,
            object.lastname,
            object.othername,
            object.email,
            object.phone,
            object.passportUrl,
            object.hash,
          ]);
  }

  checkUserExistence(email, phone, passportUrl) {
    return db.any('SELECT * FROM users WHERE email = $1 OR phone = $2 OR passporturl = $3', [email.trim(), phone.trim(), passportUrl.trim()]);
  }

  isUserRegisteredQuery(email, hash) {
    return db.any('SELECT * FROM users WHERE email = $1 OR password = $2', [email, hash]);
  }

  isUserAdminQuery(id) {
    return db.any('SELECT * FROM users WHERE id = $1', [id]);
  }
}

export default UserQueries;
