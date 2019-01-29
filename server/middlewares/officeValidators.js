/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { OfficeQueries } from '../helpers';

const query = new OfficeQueries();


class OfficeValidators {
    isOfficeFieldEmpty(req, res, next) {
        const { name, type } = req.body;
        const errors = {};
        if (!name || !name.trim() || !type || !type.trim()) {
          if (!name || !name.trim()) {
            errors.name = 'Improper office Name format';
          }
          if (!type || !type.trim()) {
            errors.type = 'Improper office Type format';
          }
          if (errors) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
        }
        next();
      }

      isOfficeTypeValid(req, res, next) {
          let { type } = req.body;
          type = type.toLowerCase();
          const officeTypeArray = ['federal', 'legislative', 'state', 'local government'];
          const foundType = officeTypeArray.find(officeType => officeType === type.trim());
          if (foundType !== undefined) {
              next();
          } else {
            return res.status(400).send({
                status: 400,
                error: 'Office Type Incorrect',
            });
          } 
      }

      doesOfficeExist(req, res, next) {
        let { name } = req.body;
        name = name.trim();
    
        query.checkOfficeExistence(name)
        .then((response) => {
          if (response.length > 0) {
            res.status(400).send({
                status: 400,
                error: 'Office Already Exists',
            });
            } else {
            next();
          }
        })
        .catch((error) => {
          return res.status(500).send({
            status: 500,
            error: error.message,
          });
        })
      } 
}

export default OfficeValidators;
