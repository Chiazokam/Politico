/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { PetitionQueries } from '../helpers';

const query = new PetitionQueries();

dotenv.load();

class PetitionController {
    createPetition(req, res) {
        const { id: createdBy } = req.userData;
        const  { office, text, evidence } = req.body;
        query.createPetitionQuery(office, createdBy, text, evidence)
        .then((response) => {
            if (response.length <= 0) {
                return res.status(400).send({
                    status: 400,
                    error: 'Petition Not Created',
                });
            }
            const data = {
                id: response[0].id,
                office: response[0].office,
                createdBy: response[0].createdBy,
                text: response[0].text,
                evidence: response[0].evidence,
            };
            return res.status(201).send({
                status: 201,
                data: [data],
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

export default PetitionController;
