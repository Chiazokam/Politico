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
        return db.any('SELECT office, candidate, count(candidate) as results FROM votes where office = $1 GROUP BY candidate, office', [office]);
      }   
}

export default ResultQueries;
