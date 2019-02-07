/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const fnameError = document.getElementById('error-fname');
const lnameError = document.getElementById('error-lname');
const onameError = document.getElementById('error-oname');
const emailError = document.getElementById('error-email');
const phoneError = document.getElementById('error-phone');
const passportError = document.getElementById('error-passport');
const passwordError = document.getElementById('error-password');

document.getElementById('signup').addEventListener('submit', signUp);

function signUp(e) {
    e.preventDefault();
    const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
    const othernameInput = document.getElementById('othername');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passportUrlInput = document.getElementById('passportUrl');
    const passwordInput = document.getElementById('password');

    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const othername = othernameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const passportUrl = passportUrlInput.value;
    const password = passwordInput.value;
    

    fetch(`${urlInUse}/auth/signup`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
              firstname,
              lastname,
              othername,
              email,
              phone,
              passportUrl,
              password,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error } = response;
        if (error) {
            if (error.firstname) {
                clearErrorDiv(fnameError);
                clearErrorOnFocus(firstnameInput, fnameError);
                addDynamicDiv(error.firstname, fnameError, 'divError');
            }
            if (error.lastname) {
                clearErrorDiv(lnameError);
                clearErrorOnFocus(lastnameInput, lnameError);
                addDynamicDiv(error.lastname, lnameError, 'divError');
            }
            if (error.othername) {
                clearErrorDiv(onameError);
                clearErrorOnFocus(othernameInput, onameError);
                addDynamicDiv(error.othername, onameError, 'divError');
            }
            if (error.email) {
                clearErrorDiv(emailError);
                clearErrorOnFocus(emailInput, emailError);
                addDynamicDiv(error.email, emailError, 'divError');
            }
            if (error.phone) {
                clearErrorDiv(phoneError);
                clearErrorOnFocus(phoneInput, phoneError);
                addDynamicDiv(error.phone, phoneError, 'divError');
            }
            if (error.passportUrl) {
                clearErrorDiv(passportError);
                clearErrorOnFocus(passportUrlInput, passportError);
                addDynamicDiv(error.passportUrl, passportError, 'divError');
            }
            if (error.password) {
                clearErrorDiv(passwordError);
                clearErrorOnFocus(passwordInput, passwordError);
                addDynamicDiv(error.password, passwordError, 'divError');
            }
        } else {
            window.location = './signin.html';
        }  
    })
    .catch((error) => console.log(error))
}
