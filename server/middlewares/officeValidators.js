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
}

export default OfficeValidators;