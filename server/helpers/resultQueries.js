/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class ResultQueries {
    doesOfficeIdExistQuery(office) {
        return db.any('SELECT id FROM offices WHERE id = $1', [office]);
      }

    getResultQuery(office) {
        return db.any(`SELECT votes.office, users.firstname, users.lastname, parties.name as party, count(candidate) as votes
        FROM votes, candidates, users, parties
        WHERE votes.candidate = candidates.id
        AND candidates.userid = users.id
        AND candidates.party = parties.id
        AND votes.office = $1
        GROUP BY votes.office, votes.candidate, users.firstname, users.lastname, parties.name`, [office]);
      }   
}

export default ResultQueries;
