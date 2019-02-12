/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class CandidateQueries {
    doesUserIdExistQuery(id) {
        return db.any('SELECT id FROM users WHERE id = $1', [id]);
      }

    doesOfficeIdExistQuery(office) {
        return db.any('SELECT id FROM offices WHERE id = $1', [office]);
      }

    doesPartyIdExistQuery(party) {
        return db.any('SELECT id FROM parties WHERE id = $1', [party]);
      }

    createCandidateQuery(office, party, userId) {
        return db.any(`INSERT INTO candidates(office, party, userId)
          VALUES($1, $2, $3) RETURNING *`, [
            office,
            party,
            userId,
          ]);
    }

    doesCandidateExistQuery(id) {
        return db.any('SELECT * FROM candidates WHERE userid = $1', [id]);
    }

    doesPartyExistForOfficeQuery(office, party) {
      return db.any('SELECT * FROM candidates WHERE office = $1 AND party = $2', [office, party]);
  }

  getCandidatesQuery(office) {
    return db.any(`SELECT candidates.id, candidates.office, users.firstname, users.lastname, offices.name AS officeName, parties.name AS partyName
      FROM users JOIN candidates
      ON users.id = candidates.userid
      JOIN offices ON candidates.office = offices.id
      JOIN parties ON candidates.party = parties.id
      WHERE office = $1`, [office]);
    }
}

export default CandidateQueries;
