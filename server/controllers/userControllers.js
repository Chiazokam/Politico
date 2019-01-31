/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserQueries } from '../helpers';

const query = new UserQueries();
dotenv.load();

class UserController {
    createUser(req, res) {
        let { firstname, lastname, othername, email, phone, passportUrl, password } = req.body;
        firstname = firstname.trim();
        lastname = lastname.trim();
        othername = othername.trim();
        email = email.trim();
        phone = phone.trim();
        passportUrl = passportUrl.trim();

        const hash = bcrypt.hashSync(password, 10);
        const user = {
            firstname,
            lastname,
            othername,
            email,
            phone,
            passportUrl,
            hash,
        };
        query.createUserQuery(user)
        .then((userResponse) => {
            if (userResponse.length > 0) {
                const data = {
                    id: userResponse[0].id,
                    firstname: userResponse[0].firstname,
                    lastname: userResponse[0].lastname,
                    othername: userResponse[0].othername,
                    email: userResponse[0].email,
                    phone: userResponse[0].phone,
                    passportUrl: userResponse[0].passportUrl,
                    isAdmin: userResponse[0].isAdmin,
                };
                const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '2d' });
                return res.status(201).send({
                    status: 201,
                    data: [{
                        token,
                        user: data,
                    }],
                });
            }
            return res.status(400).send({
                status: 400,
                error: 'User Not Created',
              });
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        });
    }

    loginUser(req, res) {
        let { email, password } = req.body;
        email = email.trim();
        const hash = bcrypt.hashSync(password, 10);

        query.isUserRegisteredQuery(email, hash)
        .then((response) => {
            if (response.length > 0) {
                if (!bcrypt.compareSync(password, response[0].password)) {
                    return res.status(400).send({
                      status: 400,
                      error: 'Email or password is incorrect',
                    });
                  }
                const data = {
                    id: response[0].id,
                    firstname: response[0].firstname,
                    lastname: response[0].lastname,
                    othername: response[0].othername,
                    email: response[0].email,
                    phone: response[0].phone,
                    passportUrl: response[0].passportUrl,
                  };
                const token = jwt.sign(data, process.env.SECRET_KEY, { expiresIn: '2d' });
                return res.status(200).send({
                    status: 200,
                    data: [{
                      token,
                      user: data,
                    }],
                  });
            }
            return res.status(400).send({
                status: 400,
                error: 'Email or password is incorrect',
              });
        })
        .catch((error) => {
            return res.status(500).send({
                status: 500,
                error: error.message,
            });
        });
    }
}

export default UserController;
