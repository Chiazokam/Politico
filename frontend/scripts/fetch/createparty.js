/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const token = localStorage.getItem('token');

const nameError = document.getElementById('error-name');
const logoError = document.getElementById('error-logo');
const addressError = document.getElementById('error-address');
const otherErrors = document.getElementById('error');
const input = document.querySelectorAll('input');
const textarea = document.querySelector('textarea');

document.getElementById('create-party').addEventListener('submit', createParty);

  function createParty(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const logoUrl = document.getElementById('logo').value;
    const hqAddress = document.getElementById('address').value;
    

    fetch(`${urlInUse}/parties`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(
            {
              name,
              logoUrl,
              hqAddress,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            if (error.name) {
                addDynamicDiv(error.name, nameError, 'divError');
            }
            if (error.logoUrl) {
                addDynamicDiv(error.logoUrl, logoError, 'divError');
            }
            if (error.hqAddress) {
                addDynamicDiv(error.hqAddress, addressError, 'divError');
            }
            if (error.message) {
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            addDynamicDiv('Party Created Successfully', otherErrors, 'divSuccess');
            textarea.value = '';
            input.forEach((field) => {
                field.value = '';
        }
    })
    .catch((error) => console.log(error))
}
