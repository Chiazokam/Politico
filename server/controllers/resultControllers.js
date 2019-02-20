/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { ResultQueries } from '../helpers';

const query = new ResultQueries();

dotenv.load();

class ResultController {
    getResults(req, res) {
        const { office } = req.params;
        query.getResultQuery(office)
        .then((response) => {
            if (response.length < 1) {
                return res.status(404).send({
                  status: 404,
                  error: { message: 'No Results for this office Found' },
                });
              }
            return res.status(200).send({
                status: 200,
                data: response,
            });
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        })
    }
}

export default ResultController;
