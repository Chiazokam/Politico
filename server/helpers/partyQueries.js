/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class PartyQueries {
    createPartyQuery(object) {
        return db.any(`INSERT INTO parties(name, hqAddress, logoUrl)
          VALUES($1, $2, $3) RETURNING *`, [
            object.name,
            object.hqAddress,
            object.logoUrl,
          ]);
     }

    checkPartyExistence(name, logoUrl) {
      return db.any('SELECT * FROM parties WHERE name = $1 OR logoUrl = $2', [name, logoUrl]);
    }

    getAllPartiesQuery() {
      return db.any('SELECT * FROM parties');
    }

    getOnePartyQuery(id) {
      return db.any('SELECT * FROM parties WHERE id = $1 ', [id]);
    }

    updatePartyNameQuery(id, name) {
      return db.any('UPDATE parties SET name = $1 WHERE id = $2', [name, id]);
    }

    deletePartyQuery(id) {
      return db.any('DELETE FROM parties WHERE id = $1', [id]);
    }
}

export default PartyQueries;
