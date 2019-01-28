/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { PartyQueries } from '../helpers';

const query = new PartyQueries();

class PartyValidators {
  isPartyFieldEmpty(req, res, next) {
    const { partyName, partyAddress, partyLogo } = req.body;
    const errors = {};
    if (!partyName || !partyName.trim() || !partyAddress || !partyAddress.trim() || !partyLogo || !partyLogo.trim()) {
      if (!partyName || !partyName.trim()) {
        errors.partyName = 'Improper party Name format';
      }
      if (!partyAddress || !partyAddress.trim()) {
        errors.partyAddress = 'Improper party Address format';
      }
      if (!partyLogo || !partyLogo.trim()) {
        errors.partyLogo = 'Improper party Logo format';
      }
      if (errors) {
        return res.status(400).send({
          status: 400,
          error: errors,
        });
      }
    }
    next();
  }

  isPartyNameString(req, res, next) {
    const { partyName } = req.body;
    if (/^[A-Za-z\s]+$/.test(partyName)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Party Name format',
      });
    }
  }

  isLogoUrlValid(req, res, next) {
    let { partyLogo } = req.body;
    partyLogo = partyLogo.trim();
    if (/\.(jpeg|jpg|png)$/.test(partyLogo)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Image format',
      });
    }
  }

  doesPartyExist(req, res, next) {
    let { partyName, partyLogo } = req.body;
    partyName = partyName.trim();
    partyLogo = partyLogo.trim();

    query.checkPartyExistence(partyName, partyLogo)
    .then((response) => {
      if (response.length > 0) {
        res.status(400).send({
            status: 400,
            error: 'Party Name or Logo already exists',
        });
        } else {
        next();
      }
    })
    .catch((error) => {
      return res.status(500).send({
        status: 500,
        error: error.message,
      });
    })
  } 
}

export default PartyValidators;