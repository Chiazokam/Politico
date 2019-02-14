/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */


const token = localStorage.getItem('token');
const id = localStorage.getItem('id');

const officeDisplay = document.getElementById('office-output');
const partyDisplay = document.getElementById('party-output');
const officeError = document.getElementById('error-office');
const partyError = document.getElementById('error-party');
const otherErrors = document.getElementById('error');

fetch(`${urlInUse}/offices`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { error, data } = response;
    if (error) {
        let output = '<option value="">No Offices Currently</option>';
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
.catch((error) => console.log(error))


fetch(`${urlInUse}/parties`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { error, data } = response;
    if (error) {
        let output = '<option value="">No Parties Currently</option>';
        officeDisplay.innerHTML = output;
    } else {
        let output = '<option value="">Select A Party</option>';

        data.forEach((party) => {
        output += `
        <option value="${party.id}">${party.name}</option>
        `;
        partyDisplay.innerHTML = output;
    })
    }
})
.catch((error) => console.log(error))


document.getElementById('interest').addEventListener('submit', declareInterest);

function declareInterest(e) {
    e.preventDefault();

    const office = officeDisplay.value;
    const party = partyDisplay.value;
    console.log(office)
    console.log(party)
    console.log(id)

    fetch(`${urlInUse}/interests`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'token': token,
        },
        body: JSON.stringify(
            {
              office,
              party,
              userId: id,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        console.log(response)
        if (error) {
            if (error.office) {
                clearErrorDiv(officeError);
                clearErrorOnFocus(officeDisplay, officeError);
                clearErrorOnFocus(officeDisplay, otherErrors);
                addDynamicDiv(error.office, officeError, 'divError');
            }
            if (error.party) {
                clearErrorDiv(partyError);
                clearErrorOnFocus(partyDisplay, partyError);
                addDynamicDiv(error.party, partyError, 'divError');
            }
            if (error.message) {
                clearErrorDiv(otherErrors);
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            clearErrorDiv(otherErrors);
            addDynamicDiv('Successfully Declared Interest', otherErrors, 'divSuccess');
        }
    })
    .catch((error) => console.log(error))
  }