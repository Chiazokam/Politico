/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

let token = localStorage.getItem('token');

fetch(`${urlInUse}/parties`, {
    headers: {
        token,
    },
})
.then((res) => res.json())
.then((response) => {
    const { data } = response;
    
    let output = '<div class="card-party title-header"><div class="party-main">Parties</div><div class="party-logo">Logo</div></div><div class="card-party title-mobile"><div class="party-main">Parties</div></div>';

    data.forEach((party) => {
        output += `
        <div class="card-party">
            <div class="party-main">
                <p><span class="title-span">Party Name</span> : ${party.name}</p>
                <p><span class="title-span">Head Quarters</span> : ${party.hqaddress}</p>
            </div> 
            <div class="party-logo"><img src="${party.logourl}"></div> 
        </div> 
        `
        document.querySelector('.output').innerHTML = output;
    })
})
.catch((error) => console.log(error))