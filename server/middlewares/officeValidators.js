/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import express from 'express';
import bodyParser from 'body-parser';
import { Office } from '../helpers';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

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
          const typeArray = ['federal', 'legislative', 'state', 'local government'];
          const foundType = typeArray.find(officeType => officeType === type.trim());
          console.log(foundType)
          if (foundType !== undefined) {
              next();
          } else {
            return res.status(400).send({
                status: 400,
                error: 'Office Type Incorrect',
            });
          } 
      }
}

export default OfficeValidators;
