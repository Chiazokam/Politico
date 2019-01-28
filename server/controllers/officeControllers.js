/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { OfficeQueries, UserQueries } from '../helpers';

const query = new OfficeQueries();
const userQuery = new UserQueries();

dotenv.load();

class OfficeController {
    createOffice(req, res) {
        const userId = req.userData.id;
        userQuery.isUserAdminQuery(userId)
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
            const { officeName, officeType } = req.body;
            const requestData = {
                officeName: officeName.trim(),
                officeType: officeType.trim(),
            };
          
            query.createOfficeQuery(requestData)
            .then((response) => {
                if (response.length > 0) {
                  const data = {
                    officeName: response[0].officename,
                    officeType: response[0].officetype,
                  };
                  return res.status(201).send({
                    status: 201,
                    data: [data],
                  });
                  }
                  return res.status(400).send({
                    status: 400,
                    error: 'Office Not Created',
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
        })
      }
}

export default OfficeController;