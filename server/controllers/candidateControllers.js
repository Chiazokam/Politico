/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { CandidateQueries } from '../helpers';

const query = new CandidateQueries();

dotenv.load();

class CandidateController {
    createCandidate(req, res) {
        const userId = req.params.id;
        const { office, party } = req.body;
        query.createCandidateQuery(office, party, userId)
        .then((response) => {
            if (response.length > 0) {
                return res.status(201).send({
                    status: 201,
                    data: [{
                        office,
                        user: userId,
                    }],
                });
            }
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        })
    }

    getCandidatesByOffice(req, res) {
        const { office } = req.params;
        query.getCandidatesQuery(office)
        .then((response) => {
            if (response.length < 1) {
                return res.status(404).send({
                  status: 404,
                  error: 'No Candidates Found',
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
          });
    }
}

export default CandidateController;
