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
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    

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
                addDynamicDiv(error.email, emailError, 'divError');
            }
            if (error.password) {
                addDynamicDiv(error.password, passwordError, 'divError');
            }
            if (error.message) {
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            const { token, user } = data[0];
            localStorage.setItem('token', token);

            if (user.isAdmin === true) {
                window.location = './admin/adminProfile.html';
            } else if (user.isAdmin === false) {
                window.location = './user/userProfile.html';
            }
        }
    })
    .catch((error) => console.log(error))
}
