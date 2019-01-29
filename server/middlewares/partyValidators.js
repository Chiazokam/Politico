/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { PartyQueries } from '../helpers';

const query = new PartyQueries();

class PartyValidators {
  isPartyFieldEmpty(req, res, next) {
    const { name, hqAddress, logoUrl } = req.body;
    const errors = {};
    if (!name || !name.trim() || !hqAddress || !hqAddress.trim() || !logoUrl || !logoUrl.trim()) {
      if (!name || !name.trim()) {
        errors.name = 'Improper party Name format';
      }
      if (!hqAddress || !hqAddress.trim()) {
        errors.hqAddress = 'Improper party Address format';
      }
      if (!logoUrl || !logoUrl.trim()) {
        errors.logoUrl = 'Improper party Logo format';
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

  isPartyInputInteger(req, res, next) {
    const { hqAddress } = req.body;
    if ( isNaN(parseFloat(hqAddress))) {
      return next();
    }
    return res.status(400).send({
      status: 400,
      error: 'Address cannot be an integer',
    });
  }

  isPartyNameString(req, res, next) {
    const { name } = req.body;
    if (/^[A-Za-z\s]+$/.test(name)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Party Name format',
      });
    }
  }

  isLogoUrlValid(req, res, next) {
    let { logoUrl } = req.body;
    logoUrl = logoUrl.trim();
    if (/\.(jpeg|jpg|png)$/.test(logoUrl)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Image format',
      });
    }
  }

  doesPartyExist(req, res, next) {
    let { name, logoUrl } = req.body;
    name = name.trim();
    logoUrl = logoUrl.trim();

    query.checkPartyExistence(name, logoUrl)
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
