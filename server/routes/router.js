/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { UserValidators } from '../middlewares';
import { UserController } from '../controllers';

const router = express.Router();
const validateUser = new UserValidators();
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

router.post('/api/v1/auth/login', validateUser.isUserLoginFieldEmpty,
                                  validateUser.isEmailValid,
                                  user.loginUser);

export default router;