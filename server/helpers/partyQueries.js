/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import db from '../models/db';

class PartyQueries {
    createPartyQuery(object) {
        return db.any(`INSERT INTO parties(partyName, partyAddress, partyLogo)
          VALUES($1, $2, $3) RETURNING *`, [
            object.partyName,
            object.partyAddress,
            object.partyLogo,
          ]);
     }

    checkPartyExistence(partyName, partyLogo) {
      return db.any('SELECT * FROM parties WHERE partyname = $1 OR partylogo = $2', [partyName, partyLogo]);
    }
}

export default PartyQueries;