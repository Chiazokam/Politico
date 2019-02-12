/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { VoteQueries } from '../helpers';

const query = new VoteQueries();


class VoteValidators {
    isVoteFieldEmpty(req, res, next) {
        const { office, candidate } = req.body;
        const errors = {};
          if (!office || !office.trim()) {
            errors.office = 'Improper Office format';
          }
          if (!candidate || !candidate.trim()) {
            errors.candidate = 'Improper Candidate format';
          }
          if (errors.office || errors.candidate) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
        next();
      }

    doesUserIdExist(req, res, next) {
        const { id: userId } = req.userData;
        query.doesUserIdExistQuery(userId)
        .then((response) => {
            if (response <= 0) {
                return res.status(404).send({
                    status: 404,
                    error: { message: 'User Not Found' },
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
                    error: { office: 'Office Not Found' },
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

    doesCandidateIdExist(req, res, next) {
        const { candidate } = req.body;
        query.doesCandidateIdExistQuery(candidate)
        .then((response) => {
            if (response <= 0) {
                return res.status(404).send({
                    status: 404,
                    error: { candidate: 'Candidate Not Found' },
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

    doesVoterExistForOffice(req, res, next) {
        const { id: voter } = req.userData;
        const { office } = req.body;
        query.doesVoterExistForOfficeQuery(office, voter)
        .then((response) => {
            if (response.length > 0) {
                return res.status(409).send({
                    status: 409,
                    error: { message: 'You cannot vote twice for this office' },
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

    isVoteInputInteger(req, res, next) {
        const { office, candidate } = req.body;
        const errors = {};
        if (typeof (office) === 'number') {
          errors.office = 'Office cannot be an Integer';
        }
        if (typeof (candidate) === 'number') {
          errors.candidate = 'Candidate cannot be an Integer';
        }
        if (errors.office || errors.candidate) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
    }

    isVoteInputValid(req, res, next) {
        const { office, candidate } = req.body;
        const errors = {};
        if (isNaN(office)) {
            errors.office = 'Office input is not valid';
        }
        if (isNaN(candidate)) {
            errors.candidate = 'Candidate input is not valid';
        }
        if (errors.office || errors.candidate) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
          next();
    }
}

export default VoteValidators;
