/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

let token = localStorage.getItem('token');
let id = localStorage.getItem('id');

fetch(`${urlInUse}/office/${id}/votes`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { error, data } = response;
    if (error) {
        let output = `
            <div class="card-party title-header">
                <div class="office-main">${error.message}</div>
            </div>

            <div class="card-party title-mobile">
                <div class="party-main">${error.message}</div>
            </div>
        `;
        document.querySelector('.output').innerHTML = output;
    } else {
        let output = `
            <div class="card-party title-header">
                <div class="office-main">Office</div> 
                <div class="office-vote office-vote-flex">
                    <div class="candidate candidate-title"> Candidate</div>
                    <div class="candidate-party">Party</div>
                </div> 
            </div>
            <div class="card-party title-mobile">
                <div class="party-main">Votes</div>
            </div>

        `;

        data.forEach((vote) => {
            output += `
                <div class="card-party">
                    <div class="office-main">
                        <p> Office of the ${vote.office}</p>
                    </div> 
                            
                    <div class="office-vote office-vote-flex">
                        <div class="candidate view-candidate">
                            <div class="candidate-name">${vote.firstname} ${vote.lastname}</div>
                        </div>
                        <div class="candidate-party view-candidate-party">
                            <div class="candidate-party-select">${vote.party}</div>
                        </div>
                    </div> 
                </div>
            `;
            document.querySelector('.output').innerHTML = output;
        })
    }
})
.catch((error) => console.log(error))
