/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { PartyValidators, ThirdPartyValidators, OfficeValidators, UserValidators } from '../middlewares';
import { PartyController, OfficeController, UserController } from '../controllers';

const router = express.Router();
const validatePartyInput = new PartyValidators();
const validateOfficeInput = new OfficeValidators();
const validateAddress = new ThirdPartyValidators();
const validateUser = new UserValidators();
const party = new PartyController();
const office = new OfficeController();
const user = new UserController();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Politico',
}));

router.post('/api/v1/auth/signup', validateUser.isUserFieldEmpty,
                                    validateUser.isEmailValid,
                                    validateUser.isPhoneValid,
                                    validateUser.isPassportUrlValid,
                                    validateUser.doesUserExist,
                                    user.createUser);

export default router;