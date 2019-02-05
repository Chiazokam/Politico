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

function addDynamicDiv(innerHTMLString, errorDiv, divId) {
    const newDiv = document.createElement('div');
    newDiv.id = divId;
    newDiv.innerHTML = innerHTMLString;
    errorDiv.appendChild(newDiv);
    errorDiv.style.visibility = 'visible';
  }

function doesInputHaveInteger(input) {
    return /\d/.test(input);
}


function signUp(e) {
    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const othername = document.getElementById('othername').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const passportUrl = document.getElementById('passportUrl').value;
    const password = document.getElementById('password').value;
    

    fetch('http://localhost:3000/api/v1/auth/signup', {
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
        if (doesInputHaveInteger(firstname) === true) {
            const message = 'Improper firstname format';
            addDynamicDiv(message, fnameError, 'divError');
        }
        if (doesInputHaveInteger(lastname) === true) {
            const message = 'Improper lastname format';
            addDynamicDiv(message, lnameError, 'divError');
        }
        if (doesInputHaveInteger(othername) === true) {
            const message = 'Improper othername format';
            addDynamicDiv(message, onameError, 'divError');
        }
        if (error) {
            if (error.firstname) {
                addDynamicDiv(error.firstname, fnameError, 'divError');
            }
            if (error.lastname) {
                addDynamicDiv(error.lastname, lnameError, 'divError');
            }
            if (error.othername) {
                addDynamicDiv(error.othername, onameError, 'divError');
            }
            if (error.email) {
                addDynamicDiv(error.email, emailError, 'divError');
            }
            if (error.phone) {
                addDynamicDiv(error.phone, phoneError, 'divError');
            }
            if (error.passportUrl) {
                addDynamicDiv(error.passportUrl, passportError, 'divError');
            }
            if (error.password) {
                addDynamicDiv(error.password, passwordError, 'divError');
            }
        } else {
            window.location = './signin.html';
        }  
    })
    .catch((error) => console.log(error))
}
