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
            error: 'Wrong email format',
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
              error: 'Wrong phone number format',
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
            error: 'Wrong Image format',
          });
        }
    }

    doesUserExist(req, res, next) {
        const { email, phone, passportUrl } = req.body;
        query.checkUserExistence(email, phone, passportUrl)
        .then((data) => {
            if (data.length > 0) {
            res.status(400).send({
                status: 400,
                error: 'User already exists',
            });
            } else {
            next();
            }
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
            error: 'User Unauthorized',
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