/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */


const emailError = document.getElementById('error-email');
const passwordError = document.getElementById('error-password');
const otherErrors = document.getElementById('error');

document.getElementById('signin').addEventListener('submit', signIn);


  function signIn(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const email = emailInput.value;
    const password = passwordInput.value;
    

    fetch(`${urlInUse}/auth/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {
              email,
              password,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            if (error.email) {
                clearErrorDiv(emailError);
                clearErrorOnFocus(emailInput, emailError);
                addDynamicDiv(error.email, emailError, 'divError');
            }
            if (error.password) {
                clearErrorDiv(passwordError);
                clearErrorOnFocus(passwordInput, passwordError);
                addDynamicDiv(error.password, passwordError, 'divError');
            }
            if (error.message) {
                clearErrorDiv(otherErrors);
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            const { token, user } = data[0];
            const { id } = user;
            localStorage.setItem('token', token);
            localStorage.setItem('id', id);

            const base64Url = token.split('.')[1];
            const decode = JSON.parse(window.atob(base64Url));

            if (decode.isAdmin === true) {
                window.location = './admin/adminProfile.html';
            } else if (decode.isAdmin === false) {
                window.location = './user/userProfile.html';
            }
        }
    })
    .catch((error) => console.log(error)) 
}
