/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.load();

class ThirdPartyValidators {
    isAddressValid(req, res, next) {
        let { hqAddress } = req.body;
        hqAddress = hqAddress.trim();
        const googleMapsClient = require('@google/maps').createClient({
            key: process.env.GOOGLE_API_KEY,
            Promise,
          });
          googleMapsClient.places({
              query: hqAddress,
          })
            .asPromise()
            .then((response) => {
                if (response.json.results) {
                    req.partyAddr = response.json.results[0].formatted_address;
                    next();
                } else {
                    return res.status(404).send({
                        status: 404,
                        error: 'Address Not Found',
                    });
                }
            })
            .catch(() => {
                return res.status(400).send({
                    status: 400,
                    error: 'Put In a Correct Address Please',
                });
            });
    }
}

export default ThirdPartyValidators;
