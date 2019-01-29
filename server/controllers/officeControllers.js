/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import { OfficeQueries } from '../helpers';

const query = new OfficeQueries();

dotenv.load();

class OfficeController {
  createOffice(req, res) {
        const { name, type } = req.body;
        const requestData = {
            name: name.trim(),
            type: type.trim(),
        };
      
        query.createOfficeQuery(requestData)
        .then((response) => {
            if (response.length > 0) {
              const data = {
                name: response[0].name,
                type: response[0].type,
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
  }

    getAllOffices(req, res) {
      query.getAllOfficesQuery()
      .then((response) => {
        if (response.length < 1) {
          return res.status(404).send({
            status: 404,
            error: 'No Offices Found',
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

export default OfficeController;
