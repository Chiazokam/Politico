/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { PartyQueries } from '../helpers';

const query = new PartyQueries();

dotenv.load();

class PartyController {
    createParty(req, res) {
        const { partyName, partyLogo } = req.body;
        const formattedAddr = req.partyAddr;
        const requestData = {
            partyName: partyName.trim(),
            partyAddress: formattedAddr,
            partyLogo: partyLogo.trim(),
          };
        
        query.createPartyQuery(requestData)
        .then((response) => {
            if (response.length > 0) {
              const data = { 
                partyName: response[0].partyname,
                partyAddress: response[0].partyaddress,
                partyLogo: response[0].partylogo,
                createdOn: response[0].createdon,
              };
              return res.status(201).send({
                status: 201,
                data: [data],
              });
              }
              return res.status(400).send({
                status: 400,
                error: 'Party Not Created',
              });
          })
        .catch((error) => {
          return res.status(500).send({
            status: 500,
            error: error.message,
          });
        });
    }

    getAllParties(req, res) {
      query.getAllPartiesQuery()
      .then((response) => {
        if (response.length < 1) {
          return res.status(404).send({
            status: 404,
            error: 'No Parties Found',
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

export default PartyController;