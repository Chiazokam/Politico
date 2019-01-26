/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { PartyValidators, ThirdPartyValidators, OfficeValidators } from '../middlewares';
import { PartyController, OfficeController } from '../controllers';

const router = express.Router();
const validatePartyInput = new PartyValidators();
const validateOfficeInput = new OfficeValidators();
const party = new PartyController();
const office = new OfficeController();
const validateAddress = new ThirdPartyValidators();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Politico',
}));

router.post('/api/v1/parties', validatePartyInput.isPartyFieldEmpty,
                                validatePartyInput.isPartyNameString,
                                validatePartyInput.isLogoUrlValid,
                                validateAddress.isAddressValid,
                                party.createNewParty);

router.post('/api/v1/offices', validateOfficeInput.isOfficeFieldEmpty,
                               validateOfficeInput.isOfficeTypeValid,
                               office.createNewOffice);

router.get('/api/v1/parties', party.getAllParties);

router.get('/api/v1/offices', office.getAllOffices);

router.get('/api/v1/parties/:id', party.getOneParty);

router.get('/api/v1/offices/:id', office.getOneOffice);

router.patch('/api/v1/parties/:id/name', party.editParty);

export default router;