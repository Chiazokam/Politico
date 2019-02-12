/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */


let token = localStorage.getItem('token');
const officeDisplay = document.getElementById('office-output');
const candidateDisplay = document.getElementById('office-candidates');
const candidatePartyDisplay = document.getElementById('candidate-party');
const officeError = document.getElementById('error-office');
const candidateError = document.getElementById('error-candidate');
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

officeDisplay.addEventListener('change', displayCandidates);

function displayCandidates() {
    const office = officeDisplay.value;

    fetch(`${urlInUse}/candidates/${office}`, {
        headers: {
            token,
        },
    })
    .then((res) => res.json())
    .then((response) => {
        const { data } = response;
        if (!data) {
            const output = '<option value="">No Candidates for this office</option>';
            candidateDisplay.innerHTML = output;
            candidatePartyDisplay.innerHTML = '';

        } else {
            let output = '<option value="">Select A Candidate</option>';
    
            data.forEach((candidate) => {
            output += `
            <option value="${candidate.id}, ${candidate.partyname}">${candidate.firstname} ${candidate.lastname}</option>
            `;
            candidateDisplay.innerHTML = output;
            });
        }
    })
    .catch((error) => console.log(error))
}

candidateDisplay.addEventListener('change', displayCandidateParty);

function displayCandidateParty() {
    const valueArray = candidateDisplay.value.split(',');
    const partyname = valueArray[1];

    let output = ``;
    output += `<option value="">${partyname}</option>`;
    candidatePartyDisplay.innerHTML = output;
}

document.getElementById('vote').addEventListener('submit', vote);

function vote(e) {
    e.preventDefault();

    const office = officeDisplay.value;
    const candidate = candidateDisplay.value.split(',')[0];
    

    fetch(`${urlInUse}/votes`, {
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
              candidate,
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
            if (error.candidate) {
                clearErrorDiv(candidateError);
                clearErrorOnFocus(candidateDisplay, candidateError);
                addDynamicDiv(error.candidate, candidateError, 'divError');
            }
            if (error.message) {
                clearErrorDiv(otherErrors);
                addDynamicDiv(error.message, otherErrors, 'divError');
            }
        } else {
            clearErrorDiv(otherErrors);
            addDynamicDiv('Voted Successfully', otherErrors, 'divSuccess');
        }
    })
    .catch((error) => console.log(error))
  }