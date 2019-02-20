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
        <div class="card-party title-mobile">
            <div class="party-main">${error.message}</div>
        </div>
        `;
        document.querySelector('.output').innerHTML = output;
    } else {
        let output = `
        <div class="card-party title-header">
            <div class="office-main">Office</div>          
        </div>
        <div class="card-party title-mobile">
            <div class="party-main">Election Results</div>
        </div>
        `;

    data.forEach((office) => {
        output += `
            <div  class="card-party card-result">
                <div class="office-main">
                    <p><a key="${office.id}">Office of the ${office.name}</a></p>
                </div>
            </div> 
            
        `;
        document.querySelector('.output').innerHTML = output;
    })
    }
})
.catch((error) => console.log(error))
