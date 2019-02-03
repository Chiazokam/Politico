/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { ResultQueries } from '../helpers';

const query = new ResultQueries();


class ResultValidators {
    isParamsInteger(req, res, next) {
        const params = Number(req.params.office);
        const errors = {};
        if (isNaN(params)) {
            errors.params = 'Parameter must be an Integer';
          }
        if (errors.params) {
          return res.status(400).send({
            status: 400,
            error: errors,
          });
        }
      next();
    }
}

export default ResultValidators;
