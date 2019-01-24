/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { InputValidators, ThirdPartyValidators } from '../middlewares';
import { PartyController } from '../controllers';

const router = express.Router();
const validateInput = new InputValidators();
const party = new PartyController();
const validateAddress = new ThirdPartyValidators();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Politico',
}));

router.post('/api/v1/parties', validateInput.isFieldEmpty,
                                validateInput.isPartyNameString,
                                validateInput.isLogoUrlValid,
                                validateAddress.isAddressValid,
                                party.createNewParty);

export default router;