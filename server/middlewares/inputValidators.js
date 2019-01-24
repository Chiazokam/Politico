/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */

import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

class InputValidators {
  isFieldEmpty(req, res, next) {
    const { partyName, partyAddress, partyLogo } = req.body;
    const errors = {};
    if (!partyName || !partyName.trim() || !partyAddress || !partyAddress.trim() || !partyLogo || !partyLogo.trim()) {
      if (!partyName || !partyName.trim()) {
        errors['partyName'] = 'Improper party Name format';
      }
      if (!partyAddress || !partyAddress.trim()) {
        errors['partyAddress'] = 'Improper party Address format';
      }
      if (!partyLogo || !partyLogo.trim()) {
        errors['partyLogo'] = 'Improper party Logo format';
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
    const { partyLogo } = req.body;
    if (/\.(jpeg|jpg|png)$/.test(partyLogo)) {
      next();
    } else {
      return res.status(400).send({
        status: 400,
        error: 'Wrong Image format',
      });
    }
  }
}

export default InputValidators;