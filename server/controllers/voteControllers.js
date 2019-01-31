/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { VoteQueries } from '../helpers';

const query = new VoteQueries();

dotenv.load();

class VoteController {
    createVote(req, res) {
        const { id: voter } = req.userData;
        const { candidate, office } = req.body;
        query.createVoteQuery(candidate, office, voter)
        .then((response) => {
            if (response.length > 0) {
                return res.status(201).send({
                    status: 201,
                    data: [{
                        candidate,
                        office,
                        voter,
                    }],
                });
            }
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        });
    }
}

export default VoteController;
