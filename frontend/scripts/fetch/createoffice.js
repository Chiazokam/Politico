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
    const nameInput = document.getElementById('name');
    const typeInput = document.getElementById('type');

    const name = nameInput.value;
    const type = typeInput.value;
    

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
                clearErrorDiv(nameError);
                clearErrorOnFocus(nameInput, nameError);
                addDynamicDiv(error.name, nameError, 'divError');
            }
            if (error.type) {
                clearErrorDiv(typeError);
                clearErrorOnFocus(typeInput, typeError);
                addDynamicDiv(error.type, typeError, 'divError');
            }
            if (error.message) {
                clearErrorDiv(otherErrors);
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
