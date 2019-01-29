/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
    const { hqAddress} = req.body;
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
        error: 'Party Name must be a string',
      });
    }
  }

  isLogoUrlValid(req, res, next) {
    const { logoUrl } = req.body;
    if (/\.(jpeg|jpg|png)$/.test(logoUrl)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Image format',
      });
    }
  }
}

export default PartyValidators;
