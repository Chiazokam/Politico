/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { UserValidators, verifyToken, ThirdPartyValidators, PartyValidators, OfficeValidators } from '../middlewares';
import { UserController, PartyController, OfficeController } from '../controllers';

const router = express.Router();

const validateUser = new UserValidators();
const validateAddress = new ThirdPartyValidators();
const validatePartyInput = new PartyValidators();
const validateOfficeInput = new OfficeValidators();

const user = new UserController();
const party = new PartyController();
const office = new OfficeController();

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
                               validateUser.isUserAdmin,
                               validatePartyInput.isPartyFieldEmpty,
                               validatePartyInput.isPartyNameString,
                               validatePartyInput.isLogoUrlValid,
                               validatePartyInput.doesPartyExist,
                               validatePartyInput.isAddressAnInteger,
                               validateAddress.isAddressValid,
                               
                               party.createParty);

                               
router.post('/api/v1/offices', verifyToken,
                               validateUser.isUserAdmin,
                               validateOfficeInput.isOfficeFieldEmpty,
                               validateOfficeInput.isOfficeTypeValid,
                               validateOfficeInput.doesOfficeExist,
                               
                               office.createOffice);

router.get('/api/v1/parties', verifyToken,
                              validateUser.isUserAdmin,
                              party.getAllParties);

router.get('/api/v1/offices', verifyToken,
                              validateUser.isUserAdmin,
                              office.getAllOffices);

router.get('/api/v1/parties/:id', verifyToken,
                              validateUser.isUserAdmin,
                              party.getOneParty);
export default router;
