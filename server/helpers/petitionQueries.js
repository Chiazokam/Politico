/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class PetitionQueries {
    createPetitionQuery(office, createdBy, text, evidence ) {
        return db.any(`INSERT INTO petitions(office, createdBy, text, evidence)
          VALUES($1, $2, $3, $4) RETURNING *`, [
            office,
            createdBy,
            text,
            evidence,
          ]);
     }

     doesOfficeExistQuery(office) {
        return db.any('SELECT id FROM offices WHERE id = $1', [office]);
      }
}

export default PetitionQueries;
