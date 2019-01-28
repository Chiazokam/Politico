/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { UserValidators, verifyToken, ThirdPartyValidators, PartyValidators } from '../middlewares';
import { UserController, PartyController } from '../controllers';

const router = express.Router();
const validateUser = new UserValidators();
const validateAddress = new ThirdPartyValidators();
const validatePartyInput = new PartyValidators();

const user = new UserController();
const party = new PartyController();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to Politico',
}));

router.post('/api/v1/auth/signup', validateUser.isUserFieldEmpty,
                                    validateUser.isEmailValid,
                                    validateUser.isPhoneValid,
                                    validateUser.isPassportUrlValid,
                                    validateUser.doesUserExist,
                                    user.createUser);

router.post('/api/v1/auth/login', validateUser.isUserLoginFieldEmpty,
                                  validateUser.isEmailValid,
                                  user.loginUser);

router.post('/api/v1/parties', verifyToken,
                               validatePartyInput.isPartyFieldEmpty,
                               validatePartyInput.isPartyNameString,
                               validatePartyInput.isLogoUrlValid,
                               validatePartyInput.doesPartyExist,
                               validateAddress.isAddressValid,
                               party.createParty);

export default router;