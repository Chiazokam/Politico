/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

let token = localStorage.getItem('token');

fetch(`${urlInUse}/offices`, {
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
        </div> 
        <div class="card-party title-mobile">
            <div class="party-main admin-view-main">${error.message}</div>
        </div>
        `;
        document.querySelector('.output').innerHTML = output;
    } else {
        let output = `
        <div class="card-party title-header">
            <div class="office-main">Office</div> 
            <div class="office-vote office-vote-flex">
            <div class="candidate-party">Office Type</div>
            </div> 
        </div> 
        <div class="card-party title-mobile">
            <div class="party-main admin-view-main">Offices</div>
        </div>
        `;

    data.forEach((office) => {
        output += `
        <div class="card-party vote-card-party">
        <div class="office-main">
            <p><span class="title-span">Office of the ${office.name}</span></p>
            
        </div> 
        <div class="office-vote office-vote-flex">
            <div class="candidate"><p><span class="title-span">${office.type}</span></p>
            </div>
        </div> 
    </div> 
        `;
        document.querySelector('.output').innerHTML = output;
    })
    }
})
.catch((error) => console.log(error))
