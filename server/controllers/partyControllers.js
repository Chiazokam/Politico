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
        const { name, logoUrl } = req.body;
        const formattedAddr = req.partyAddr;
        const requestData = {
            name: name.trim(),
            hqAddress: formattedAddr,
            logoUrl: logoUrl.trim(),
          };
        
        query.createPartyQuery(requestData)
        .then((response) => {
            if (response.length > 0) {
              const data = {
                id: response[0].id,
                name: response[0].name,
                hqAddress: response[0].hqaddress,
                logoUrl: response[0].logourl,
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
            error: { message: 'No Parties Found' },
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

    getOneParty(req, res) {
      const id = req.params.id;
      query.getOnePartyQuery(id)
      .then((response) => {
        if (response.length === 0) {
          return res.status(404).send({
            status: 404,
            error: { message: 'Party Not Found' },
          });
        }
        const data = {
          id: response[0].id,
          name: response[0].name,
          hqAddress: response[0].hqaddress,
          logoUrl: response[0].logourl,
        };
        return res.status(200).send({
          status: 200,
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

    editParty(req, res) {
      const { id } = req.params;
      const { name } = req.body;
      query.getOnePartyQuery(id)
      .then((response) => {
        if (response.length === 0) {
          return res.status(404).send({
            status: 404,
            error: 'Party Not Found',
          });
        }
        const data = {
          id: response[0].id,
          name,
        };
        query.updatePartyNameQuery(id, name)
          return res.status(200).send({
            status: 200,
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

    deleteParty(req, res) {
      const { id } = req.params;
      query.getOnePartyQuery(id)
      .then((response) => {
        if (response.length === 0) {
          return res.status(404).send({
            status: 404,
            error: 'Party Not Found',
          });
        }
        query.deletePartyQuery(id);
        return res.status(200).send({
          status: 200,
          data: [{
            message: 'Party Successfully deleted',
          }],
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

export default PartyController;
