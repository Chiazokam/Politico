/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable indent */

import { UserQueries } from '../helpers';

const query = new UserQueries();


class UserValidators {
    isUserFieldEmpty(req, res, next) {
        const { firstname, lastname, othername, email, phone, passportUrl, password } = req.body;
        const errors = {};
        if (!firstname || !firstname.trim() || !lastname || !lastname.trim() || !othername || !othername.trim() 
        || !email || !email.trim() || !phone || !phone.trim() || !passportUrl || !passportUrl.trim() || !password || !password.trim()) {
            
            if (!firstname || !firstname.trim()) {
              errors.firstname = 'Firstname field cannot be empty';
            }
            if (!lastname || !lastname.trim()) {
              errors.lastname = 'Lastname field cannot be empty';
            }
            if (!othername || !othername.trim()) {
              errors.othername = 'Othername field cannot be empty';
            }
            if (!email || !email.trim()) {
                errors.email = 'Email field cannot be empty';
            }
            if (!phone || !phone.trim()) {
              errors.phone = 'Phone Number field cannot be empty';
            }
            if (!passportUrl || !passportUrl.trim()) {
                errors.passportUrl = 'Passport Url field cannot be empty';
            }
            if (!password || !password.trim()) {
                errors.password = 'Password field cannot be empty';
            }
            if (errors) {
              return res.status(400).send({
                status: 400,
                error: errors,
              });
            }
          }
          next();
    }

    isSignUpNameString(req, res, next) {
      const { firstname, lastname, othername } = req.body;
      const errors = {};
      if (/\d/.test(firstname) === true) {
        errors.firstname = 'Invalid firstname';
      }
      if (/\d/.test(lastname) === true) {
        errors.lastname = 'Invalid lastname';
      }
      if (/\d/.test(othername) === true) {
        errors.othername = 'Invalid othername';
      }
      if (errors.firstname || errors.lastname || errors.othername) {
        return res.status(400).send({
          status: 400,
          error: errors,
        });
      }
      next();
    }

    isSignUpInputInteger(req, res, next) {
      const { firstname, lastname, othername, email, phone, passportUrl, password } = req.body;
      const errors = {};
      if (typeof (firstname) === 'number') {
        errors.firstname = 'First Name cannot be an Integer';
      }
      if (typeof (lastname) === 'number') {
        errors.lastname = 'Last Name cannot be an Integer';
      }
      if (typeof (othername) === 'number') {
        errors.othername = 'Other Name cannot be an Integer';
      }
      if (typeof (email) === 'number') {
        errors.email = 'Email cannot be an Integer';
      }
      if (typeof (phone) === 'number') {
        errors.phone = 'Phone Number cannot be an Integer';
      }
      if (typeof (passportUrl) === 'number') {
        errors.passportUrl = 'Passport Url cannot be an Integer';
      }
      if (typeof (password) === 'number') {
        errors.password = 'Password cannot be an Integer';
      }
      if (errors.firstname || errors.lastname || errors.othername
        || errors.email || errors.phone || errors.passportUrl || errors.password) {
        return res.status(400).send({
          status: 400,
          error: errors,
        });
      }
    next();
    }

    isLoginInputInteger(req, res, next) {
      const { email, password } = req.body;
      const errors = {};
      if (typeof (email) === 'number') {
        errors.email = 'Email cannot be an Integer';
      }
      if (typeof (password) === 'number') {
        errors.password = 'Password cannot be an Integer';
      }
      if (errors.email || errors.password) {
        return res.status(400).send({
          status: 400,
          error: errors,
        });
      }
    next();
    }

    isUserLoginFieldEmpty(req, res, next) {
      const { email, password } = req.body;
      const errors = {};
      if (!email || !email.trim() || !password || !password.trim()) {
          if (!email || !email.trim()) {
              errors.email = 'Email field cannot be empty';
          }
          if (!password || !password.trim()) {
              errors.password = 'Password field cannot be empty';
          }
          if (errors) {
            return res.status(400).send({
              status: 400,
              error: errors,
            });
          }
        }
        next();
   }

    isEmailValid(req, res, next) {
        const { email } = req.body;
        if (/\S+@\S+\.\S+/.test(email)) {
          next();
        } else {
          return res.status(400).send({
            status: 400,
            error: { email: 'Wrong email format' },
          });
        }
      }

    isPhoneValid(req, res, next) {
        const { phone } = req.body;
        if (/\+\d{1,3}-\d{1,14}/.test(phone)) {
            next();
        } else {
            return res.status(400).send({
              status: 400,
              error: { phone: 'Wrong phone number format: should be +xxx-xxxxxxxxxx' },
            });
          }
    }

    isPassportUrlValid(req, res, next) {
        const { passportUrl } = req.body;
        if (/\.(jpeg|jpg|png)$/.test(passportUrl)) {
          next();
        } else {
          return res.status(400).send({
            status: 400,
            error: { passportUrl: 'Wrong Image format' },
          });
        }
    }

    doesUserExist(req, res, next) {
      const { email, phone, passportUrl } = req.body;
      query.checkUserExistence(email, phone, passportUrl)
      .then((response) => {
          if (response.length > 0) {
            const data = {
              email: response[0].email,
              phone: response[0].phone,
              passportUrl: response[0].passporturl,
            };
            const errors = {};
            if (data.email === email) {
              errors.email = 'Email Already Exists';
            }
            if (data.phone === phone) {
              errors.phone = 'Phone Number Already Exists';
            }
            if (data.passportUrl === passportUrl) {
              errors.passportUrl = 'Passport Url Already Exists';
            }
            return res.status(409).send({
              status: 409,
              error: errors,
            });
          }
          next();
      })
      .catch((err) => {
          res.status(500).send({
              error: err.message,
          });
      });
    }

    isUserAdmin(req, res, next) {
      const userId = req.userData.id;
      query.isUserAdminQuery(userId)
      .then((response) => {
        const user = {
          id: response[0].id,
          isAdmin: response[0].isadmin,
        };
        if (user.isAdmin === false) {
          return res.status(401).send({
            status: 401,
            error: { message: 'User Unauthorized' },
          });
        }
        next();
      })
      .catch((error) => {
        return res.status(500).send({
          status: 500,
          error: error.message,
        });
      });
    }
}

export default UserValidators;
