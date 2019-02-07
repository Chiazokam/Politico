/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable indent */

import express from 'express';

import { UserValidators,
         verifyToken,
         ThirdPartyValidators,
         PartyValidators,
         OfficeValidators,
         CandidateValidators,
         VoteValidators,
         ResultValidators,
         PetitionValidators } from '../middlewares';

import { UserController,
         PartyController,
         OfficeController,
         CandidateController,
         VoteController,
         ResultController,
         PetitionController } from '../controllers';

const router = express.Router();

const validateUser = new UserValidators();
const validateAddress = new ThirdPartyValidators();
const validatePartyInput = new PartyValidators();
const validateOfficeInput = new OfficeValidators();
const validateCandidate = new CandidateValidators();
const validateVote = new VoteValidators();
const validateResult = new ResultValidators();
const validatePetition = new PetitionValidators();

const user = new UserController();
const party = new PartyController();
const office = new OfficeController();
const candidate = new CandidateController();
const vote = new VoteController();
const result = new ResultController();
const petition = new PetitionController();


router.post('/api/v1/auth/signup', validateUser.isSignUpInputInteger,
                                    validateUser.isUserFieldEmpty,
                                    validateUser.isSignUpNameString,
                                    validateUser.isEmailValid,
                                    validateUser.isPhoneValid,
                                    validateUser.isPassportUrlValid,
                                    validateUser.doesUserExist,
                                    user.createUser);

router.post('/api/v1/auth/login', validateUser.isLoginInputInteger,
                                  validateUser.isUserLoginFieldEmpty,
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
                               validateOfficeInput.isOfficeNameString,
                               validateOfficeInput.isOfficeInputInteger,
                               validateOfficeInput.isOfficeFieldEmpty,
                               validateOfficeInput.isOfficeTypeValid,
                               validateOfficeInput.doesOfficeExist,
                               office.createOffice);

router.get('/api/v1/parties', verifyToken,
                              party.getAllParties);

router.get('/api/v1/offices', verifyToken,
                              office.getAllOffices);

router.get('/api/v1/parties/:id', validateCandidate.isParamsInteger,
                              verifyToken,
                              party.getOneParty);

router.get('/api/v1/offices/:id', validateCandidate.isParamsInteger,
                              verifyToken,
                              office.getOneOffice);

router.patch('/api/v1/parties/:id/name', validateCandidate.isParamsInteger,
                                       verifyToken,
                                       validateUser.isUserAdmin,
                                       validatePartyInput.isEditInputEmpty,
                                       validatePartyInput.doesPartyNameExist,
                                       party.editParty);

router.delete('/api/v1/parties/:id', validateCandidate.isParamsInteger,
                                    verifyToken,
                                    validateUser.isUserAdmin,
                                    party.deleteParty);

router.post('/api/v1/offices/:id/register', validateCandidate.isParamsInteger,
                                            verifyToken,
                                            validateUser.isUserAdmin,
                                            validateCandidate.isCandidateInputInteger,
                                            validateCandidate.isCandidateInputValid,
                                            validateCandidate.doesUserIdExist,
                                            validateCandidate.doesCandidateExist,
                                            validateCandidate.doesOfficeIdExist,
                                            validateCandidate.doesPartyIdExist,
                                            validateCandidate.doesPartyExistForOffice,
                                            candidate.createCandidate);

router.post('/api/v1/votes', verifyToken,
                             validateVote.isVoteInputInteger,
                             validateVote.isVoteFieldEmpty,
                             validateVote.isVoteInputValid,
                             validateVote.doesVoterExistForOffice,
                             validateVote.doesUserIdExist,
                             validateVote.doesOfficeIdExist,
                             validateVote.doesCandidateIdExist,
                             vote.createVote);

router.get('/api/v1/office/:office/result', validateResult.isParamsInteger,
                                              verifyToken,
                                              result.getResults);

router.post('/api/v1/petitions', verifyToken,
                                 validatePetition.isPetitionInputInteger,
                                 validatePetition.isPetitionFieldEmpty,
                                 validatePetition.isPetitionOfficeValid,
                                 validatePetition.doesOfficeExist,
                                 petition.createPetition);

router.get('/api/v1/candidates/:office', validateResult.isParamsInteger,
                                         verifyToken,
                                         candidate.getCandidatesByOffice);
export default router;
