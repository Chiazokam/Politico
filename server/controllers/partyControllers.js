/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { PartyQueries, UserQueries } from '../helpers';

const query = new PartyQueries();
const userQuery = new UserQueries();

dotenv.load();

class PartyController {
    createParty(req, res) {
      const userId = req.userData.id;
      userQuery.isUserAdmin(userId)
      .then((responseObject) => {
          const user = {
              id: responseObject[0].id,
              isAdmin: responseObject[0].isadmin,
          };
          if (user.isAdmin === false) {
              return res.status(401).send({
                  status: 401,
                  error: 'User Unauthorized',
                });
          }
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
        })
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