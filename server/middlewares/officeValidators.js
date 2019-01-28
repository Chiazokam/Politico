/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { OfficeQueries } from '../helpers';

const query = new OfficeQueries();


class OfficeValidators {
    isOfficeFieldEmpty(req, res, next) {
        const { officeName, officeType } = req.body;
        const errors = {};
        if (!officeName || !officeName.trim() || !officeType || !officeType.trim()) {
          if (!officeName || !officeName.trim()) {
            errors.officeName = 'Improper office Name format';
          }
          if (!officeType || !officeType.trim()) {
            errors.officeType = 'Improper office Type format';
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
          let { officeType } = req.body;
          officeType = officeType.toLowerCase();
          const officeTypeArray = ['federal', 'legislative', 'state', 'local government'];
          const foundType = officeTypeArray.find(type => type === officeType.trim());
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
        let { officeName } = req.body;
        officeName = officeName.trim();
    
        query.checkOfficeExistence(officeName)
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