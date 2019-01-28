/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class OfficeQueries {
    createOfficeQuery(object) {
        return db.any(`INSERT INTO offices(officeName, officeType)
          VALUES($1, $2) RETURNING *`, [
            object.officeName,
            object.officeType,
          ]);
     }

    checkOfficeExistence(officeName) {
      return db.any('SELECT * FROM offices WHERE officename = $1', [officeName]);
    }
}

export default OfficeQueries;