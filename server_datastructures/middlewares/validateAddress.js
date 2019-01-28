/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import dotenv from 'dotenv';


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.load();

class ThirdPartyValidators {
    isAddressValid(req, res, next) {
        let { partyAddress } = req.body;
        partyAddress = partyAddress.trim();
        const googleMapsClient = require('@google/maps').createClient({
            key: process.env.GOOGLE_API_KEY,
            Promise,
          });
          googleMapsClient.places({
              query: partyAddress,
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
            .catch((err) => {
                return res.status(500).send({
                    status: 500,
                    error: err.message,
                });
            });
    }
}

export default ThirdPartyValidators;