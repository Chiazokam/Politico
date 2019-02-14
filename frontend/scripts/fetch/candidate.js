/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */


const token = localStorage.getItem('token');

const interestDisplay = document.getElementById('interest-output');
const officeDisplay = document.getElementById('interest-office');
const partyDisplay = document.getElementById('interest-party');
const interestError = document.getElementById('error-interest');
const officeError = document.getElementById('error-office');
const partyError = document.getElementById('error-party');
const otherErrors = document.getElementById('error');

// --> GET INTERESTED CANDIDATES

fetch(`${urlInUse}/interests`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { error, data } = response;
    if (error) {
        let output = '<option value="">No Interested Candidates Currently</option>';
        interestDisplay.innerHTML = output;
    } else {
        let output = '<option value="">Select An Interested Candidate</option>';

        data.forEach((interest) => {
        output += `
        <option value="${interest.office}, ${interest.party}, ${interest.userid}">${interest.firstname} ${interest.lastname}</option>
        `;
        interestDisplay.innerHTML = output;
    })
    }
})
.catch((error) => console.log(error))


interestDisplay.addEventListener('change', displayOffice);

// --> GET PARTY

function displayParty() {
    const party = interestDisplay.value.split(',')[1];

    fetch(`${urlInUse}/parties/${party}`, {
        headers: {
            token,
        },
    })
    .then((res) => res.json())
    .then((response) => {
        const { data } = response;
        let output = `
            <option value="${party}">${data[0].name}</option>
        `;
        partyDisplay.innerHTML = output;
    })
    .catch((error) => console.log(error))
}

// --> GET OFFICE

function displayOffice() {
    const office = interestDisplay.value.split(',')[0];

    fetch(`${urlInUse}/offices/${office}`, {
        headers: {
            token,
        },
    })
    .then((res) => res.json())
    .then((response) => {
        displayParty();
        const { data } = response;
        let output =  `
            <option value="${office}">${data[0].name}</option>
        `;
        officeDisplay.innerHTML = output;
    })
    .catch((error) => console.log(error))
}

// --> POST CANDIDATE

document.getElementById('create-candidate').addEventListener('submit', createCandidate);

function createCandidate(e) {
    e.preventDefault();

    const office = interestDisplay.value.split(',')[0];
    const party = interestDisplay.value.split(',')[1];
    const id = interestDisplay.value.split(',')[2];

    if (!id) {
        clearErrorDiv(interestError);
        clearErrorOnFocus(interestDisplay, interestError);
        clearErrorOnFocus(interestDisplay, otherErrors);
        addDynamicDiv('Select an interested Candidate', interestError, 'divError');
    }

    fetch(`${urlInUse}/offices/${id}/register`, {
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
              party,
            },
            ),
    })
    .then((res) => res.json())
    .then((response) => {
        const { error, data } = response;
        if (error) {
            setTimeout(clearErrorDiv(otherErrors), 500)
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
            addDynamicDiv('Created Candidate Successfully', otherErrors, 'divSuccess');
        }
    })
    .catch((error) => console.log(error))
  }