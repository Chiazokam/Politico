/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class OfficeQueries {
    createOfficeQuery(object) {
        return db.any(`INSERT INTO offices(name, type)
          VALUES($1, $2) RETURNING *`, [
            object.name,
            object.type,
          ]);
     }

    checkOfficeExistence(name) {
      return db.any('SELECT * FROM offices WHERE name = $1', [name]);
    }

    getAllOfficesQuery() {
      return db.any('SELECT * FROM offices');
    }
}

export default OfficeQueries;
