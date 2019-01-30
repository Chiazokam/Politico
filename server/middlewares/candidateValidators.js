/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { CandidateQueries } from '../helpers';

const query = new CandidateQueries();


class CandidateValidators {
    isCandidateFieldEmpty(req, res, next) {
        const { office, party } = req.body;
        const errors = {};
        if (!office || !office.trim()) {
            errors.office = 'Improper office Id format';
        }
        if (!party || !party.trim()) {
            errors.party = 'Improper party Id format';
        }
        if (errors.office || errors.party) {
            return res.status(400).send({
                status: 400,
                error: errors,
            });
        }
        next();
    }

    doesUserIdExist(req, res, next) {
        const userId = req.params.id;
        query.doesUserIdExistQuery(userId)
        .then((response) => {
            if(response <= 0) {
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

    doesOfficeIdExist(req, res, next) {
        const { office } = req.body;
        query.doesOfficeIdExistQuery(office)
        .then((response) => {
            if (response <= 0) {
                return res.status(404).send({
                    status: 404,
                    error: 'Office Not Found',
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

    doesPartyIdExist(req, res, next) {
        const { party } = req.body;
        query.doesPartyIdExistQuery(party)
        .then((response) => {
            if (response <= 0) {
                return res.status(404).send({
                    status: 404,
                    error: 'Party Not Found',
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

    isCandidateInputInteger(req, res, next) {
        const { office, party } = req.body;
        const errors = {};
        if (typeof (office) === 'number') {
          errors.office = 'Office cannot be an Integer';
        }
        if (typeof (party) === 'number') {
          errors.party = 'Party cannot be an Integer';
        }
        if (errors.office || errors.party) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
    }

    isCandidateInputValid(req, res, next) {
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

    doesCandidateExist(req, res, next) {
        const userId = req.params.id;
        query.doesCandidateExistQuery(userId)
        .then((response) => {
            if (response.length > 0) {
                return res.status(409).send({
                    status: 409,
                    error: 'Candidate Already Exists',
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

export default CandidateValidators;
