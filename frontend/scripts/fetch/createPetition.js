/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const token = localStorage.getItem('token');
const id = localStorage.getItem('id');

const officeDisplay = document.querySelector('.office-output');
const petitionDisplay = document.querySelector('.petition-textarea');
const evidenceDisplay = document.querySelector('.evidence');
const officeError = document.getElementById('error-office');
const textError = document.getElementById('error-text');
const evidenceError = document.getElementById('error-evidence');
const otherErrors = document.getElementById('error');

fetch(`${urlInUse}/candidates/${id}/user`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { error, data } = response;
    if (error) {
        let output = '';
        document.querySelector('.output').innerHTML = output;
    } else {
        let output = '<li class="create-petition"><a>Create Petition</a></li>';
        document.querySelector('.output').innerHTML = output;
    }
})
.then(() =>{
    fetch(`${urlInUse}/offices`, {
        headers: {
            token,
        },
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            let output = `<option value="">${error.message}</option>`;
            officeDisplay.innerHTML = output;
        } else {
            let output = '<option value="">Select An Office</option>';
            data.forEach((office) => {
                output += `
                <option value="${office.id}">${office.name}</option>
                `;
            officeDisplay.innerHTML = output;
            })
        }
    })
})

document.getElementById('petition-form').addEventListener('submit', createPetition);

function createPetition(e) {
    e.preventDefault();

    const office = officeDisplay.value;
    const text = petitionDisplay.value;
    const evidence = evidenceDisplay.value;

    fetch(`${urlInUse}/petitions`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(
            {
              office,
              text,
              evidence,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            if (error.office) {
                clearErrorDiv(officeError);
                clearErrorOnFocus(officeDisplay, officeError);
                clearErrorOnFocus(officeDisplay, otherErrors);
                addDynamicDiv(error.office, officeError, 'divError');
            }
            if (error.text) {
                clearErrorDiv(textError);
                clearErrorOnFocus(petitionDisplay, textError);
                addDynamicDiv(error.text, textError, 'divError');
            }
            if (error.evidence) {
                clearErrorDiv(evidenceError);
                clearErrorOnFocus(evidenceDisplay, evidenceError);
                addDynamicDiv(error.evidence, evidenceError, 'divError');
            }
            if (error.message) {
                clearErrorDiv(otherErrors);
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            clearErrorDiv(otherErrors);
            addDynamicDiv('Created Petition Successfully', otherErrors, 'divSuccess');
            petitionDisplay.value = '';
        }
    })
    .catch((error) => console.log(error))
  }
