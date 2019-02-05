/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const token = localStorage.getItem('token');

const nameError = document.getElementById('error-name');
const typeError = document.getElementById('error-type');
const otherErrors = document.getElementById('error');
const input = document.querySelector('input');
const select = document.querySelector('select');
document.getElementById('createOffice').addEventListener('submit', createOffice);

  function createOffice(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const type = document.getElementById('type').value;
    

    fetch(`${urlInUse}/offices`, {
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
              type,
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
            if (error.type) {
                addDynamicDiv(error.type, typeError, 'divError');
            }
            if (error.message) {
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            addDynamicDiv('Office Created Successfully', otherErrors, 'divSuccess');
            input.value = '';
            select.value = 'Select Office Type';
        }
    })
    .catch((error) => console.log(error))
}
