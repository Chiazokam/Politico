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
                        party,
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

    createInterest(req, res) {
        const { office, party, userId } = req.body;
        query.createInterestQuery(office, party, userId)
        .then((response) => {
            if (response.length > 0) {
                return res.status(201).send({
                    status: 201,
                    data: [{
                        id: response[0].id,
                        office,
                        party,
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

    getInterestedUsers(req, res) {
        query.getInterestedUsersQuery()
        .then((response) => {
            if (response.length < 1) {
                return res.status(404).send({
                  status: 404,
                  error: 'No Interested Users Found',
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

    confirmUserCandidacy(req, res) {
        const { id } = req.params;
        query.confirmUserCandidacyQuery(id)
        .then((response) => {
            if (response.length < 1) {
                return res.status(404).send({
                  status: 404,
                  error: { message: 'You have to be a Candidate' },
                });
              }
              return res.status(200).send({
                status: 200,
                data: {
                    id: response[0].id,
                    candidate: true,
                },
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
