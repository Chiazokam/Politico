/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { PetitionQueries } from '../helpers';

const query = new PetitionQueries();


class PetitionValidators {
    isPetitionFieldEmpty(req, res, next) {
        const { office, text, evidence } = req.body;
        const errors = {};
          if (!office || !office.trim()) {
            errors.office = 'Improper Office format';
          }
          if (!text || !text.trim()) {
            errors.text = 'Improper text format';
          }
          if (!evidence || !evidence.trim()) {
            errors.evidence = 'Improper format for evidence';
          }
          if (errors.office || errors.text || errors.evidence) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
        next();
      }

      isPetitionInputInteger(req, res, next) {
        const { office, text, evidence } = req.body;
        const errors = {};
        if (typeof (office) === 'number') {
          errors.office = 'Office cannot be an Integer';
        }
        if (typeof (text) === 'number') {
          errors.text = 'Petition text cannot be an Integer';
        }
        if (typeof (evidence) === 'number') {
          errors.evidence = 'Petition evidence cannot be an Integer';
        }
        if (errors.office || errors.text || errors.evidence) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
      }

      isPetitionOfficeValid(req, res, next) {
        const { office } = req.body;
        const errors = {};
        if (isNaN(office)) {
            errors.office = 'Office input is not valid';
        }
        if (errors.office) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
          next();
    }

    doesOfficeExist(req, res, next) {
        const { office } = req.body;
        query.doesOfficeExistQuery(office)
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

    isEvidenceUrlValid(req, res, next) {
        let { evidence } = req.body;
        evidence = evidence.trim();
        if (/\.(jpeg|jpg|png)$/.test(evidence)) {
          next();
        } else {
          return res.status(400).send({
            status: 400,
            error: 'Wrong Image format',
          });
        }
      }
}

export default PetitionValidators;
