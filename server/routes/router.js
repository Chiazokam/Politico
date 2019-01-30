/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';
import { UserValidators, verifyToken, ThirdPartyValidators, PartyValidators, OfficeValidators, CandidateValidators, VoteValidators } from '../middlewares';
import { UserController, PartyController, OfficeController, CandidateController, VoteController } from '../controllers';

const router = express.Router();

const validateUser = new UserValidators();
const validateAddress = new ThirdPartyValidators();
const validatePartyInput = new PartyValidators();
const validateOfficeInput = new OfficeValidators();
const validateCandidate = new CandidateValidators();
const validateVote = new VoteValidators();

const user = new UserController();
const party = new PartyController();
const office = new OfficeController();
const candidate = new CandidateController();
const vote = new VoteController();

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
                               validatePartyInput.isPartyInputInteger,
                               validatePartyInput.isPartyFieldEmpty,
                               validatePartyInput.isPartyNameString,
                               validatePartyInput.isLogoUrlValid,
                               validatePartyInput.doesPartyExist,
                               validateAddress.isAddressValid,
                               party.createParty);

                               
router.post('/api/v1/offices', verifyToken,
                               validateUser.isUserAdmin,
                               validateOfficeInput.isOfficeInputInteger,
                               validateOfficeInput.isOfficeFieldEmpty,
                               validateOfficeInput.isOfficeTypeValid,
                               validateOfficeInput.doesOfficeExist,
                               office.createOffice);

router.get('/api/v1/parties', verifyToken,
                              party.getAllParties);

router.get('/api/v1/offices', verifyToken,
                              office.getAllOffices);

router.get('/api/v1/parties/:id', verifyToken,
                              party.getOneParty);

router.get('/api/v1/offices/:id', verifyToken,
                              office.getOneOffice);

router.patch('/api/v1/parties/:id/name', verifyToken,
                                       validateUser.isUserAdmin,
                                       party.editParty);

router.delete('/api/v1/parties/:id', verifyToken,
                                    validateUser.isUserAdmin,
                                    party.deleteParty);

router.post('/api/v1/offices/:id/register', verifyToken,
                                            validateUser.isUserAdmin,
                                            validateCandidate.isCandidateInputInteger,
                                            validateCandidate.isCandidateInputValid,
                                            validateCandidate.doesUserIdExist,
                                            validateCandidate.doesCandidateExist,
                                            validateCandidate.doesOfficeIdExist,
                                            validateCandidate.doesPartyIdExist,
                                            candidate.createCandidate);

router.post('/api/v1/votes', verifyToken,
                             validateVote.isVoteInputInteger,
                             validateVote.isVoteInputValid,
                             validateVote.doesVoterExistForOffice,
                             validateVote.doesUserIdExist,
                             validateVote.doesOfficeIdExist,
                             validateVote.doesCandidateIdExist,
                             vote.creatVote);
export default router;
