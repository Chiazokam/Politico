/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { CandidateQueries } from '../helpers';

const query = new CandidateQueries();


class InterestValidators {
    isInterestFieldEmpty(req, res, next) {
        const { office, party, userId } = req.body;
        const errors = {};
        if (!office || !office.trim()) {
            errors.office = 'Improper office Id format';
        }
        if (!party || !party.trim()) {
            errors.party = 'Improper party Id format';
        }
        if (!userId || !userId.trim()) {
            errors.user = 'Improper user Id format';
        }
        if (errors.office || errors.party || errors.user) {
            return res.status(400).send({
                status: 400,
                error: errors,
            });
        }
        next();
    }

    doesUserIdExist(req, res, next) {
        const { userId } = req.body;
        query.doesUserIdExistQuery(userId)
        .then((response) => {
            if (response <= 0) {
                return res.status(404).send({
                    status: 404,
                    error: 'User Not Found',
                });
            }
            next();
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        })
    }

    isUserInputInteger(req, res, next) {
        const { office, party, userId } = req.body;
        const errors = {};
        if (typeof (office) === 'number') {
          errors.office = 'Office cannot be an Integer';
        }
        if (typeof (party) === 'number') {
          errors.party = 'Party cannot be an Integer';
        }

        if (typeof (userId) === 'number') {
            errors.user = 'User id cannot be an integer';
          }
        if (errors.office || errors.party || errors.user) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
    }

    isUserInputValid(req, res, next) {
        const { office, party } = req.body;
        const errors = {};
        if (isNaN(office)) {
            errors.office = 'Office input is not valid';
        }
        if (isNaN(party)) {
            errors.party = 'Party input is not valid';
        }
        if (errors.office || errors.party) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
          next();
    }

    doesInterestExist(req, res, next) {
        const { userId } = req.body;
        query.doesInterestExistQuery(userId)
        .then((response) => {
            if (response.length > 0) {
                return res.status(409).send({
                    status: 409,
                    error: { message: 'You cannot declare interest twice' },
                });
            }
            next();
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        })
    }

}

export default InterestValidators;
