/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class VoteQueries {
    doesUserIdExistQuery(id) {
        return db.any('SELECT id FROM users WHERE id = $1', [id]);
      }

    doesOfficeIdExistQuery(office) {
        return db.any('SELECT id FROM offices WHERE id = $1', [office]);
      }

    doesCandidateIdExistQuery(candidate) {
        return db.any('SELECT id FROM candidates WHERE id = $1', [candidate]);
      }

    createVoteQuery(candidate, office, voter) {
        return db.any(`INSERT INTO votes (candidate, office, voter)
          VALUES($1, $2, $3) RETURNING *`, [
            candidate,
            office,
            voter,
          ]);
    }

    doesVoterExistForOfficeQuery(office, voter) {
        return db.any('SELECT * FROM votes WHERE office = $1 AND voter = $2', [office, voter]);
    }

    getVotesQuery(id) {
      return db.any(`SELECT offices.name as office, users.firstname, users.lastname, parties.name as party
      FROM votes, offices, candidates, users, parties
      WHERE votes.office = offices.id
      AND votes.candidate = candidates.id
      AND candidates.userid = users.id
      AND candidates.party = parties.id
      AND votes.voter = $1`, [id]);
    }
}

export default VoteQueries;
