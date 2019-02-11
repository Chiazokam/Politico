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
        const { error, data } = response;
        if (error) {
            let output = `
            <div class="card-party title-header">
                <div class="party-main-admin party-main-parties admin-view-main">${error.message}</div>
            </div>

            <div class="card-party title-mobile">
                <div class="party-main admin-view-main">${error.message}</div>
            </div>
        `;
        document.querySelector('.output').innerHTML = output;
        
        } else {
            let output = `
            <div class="card-party title-header">
                <div class="party-main-admin party-main-parties admin-view-main">Parties</div> 
                <div class="party-logo">Logo</div> 
            </div>

            <div class="card-party title-mobile">
                <div class="party-main admin-view-main">Parties</div>
            </div>
        `;

        data.forEach((party) => {
            output += `
            <div class="card-party admin-card">
                <div class="party-main-admin admin-view-main">
                    <p><span class="title-span">Party Name</span>: ${party.name}</p>
                        <p><span class="title-span">Head Quarters</span>: ${party.hqaddress}</p>
                            <a class="edit" onclick="editParty(${party.id})">Edit Name</a>
                            <a class="delete" key="${party.id}">Delete</a>
                </div> 
                <div class="party-logo"><img src="${party.logourl}"></div> 
            </div> 
            `
            document.querySelector('.output').innerHTML = output;
        });
        }
    })
    .catch((error) => console.log(error))


function editParty(id) {

    fetch(`${urlInUse}/parties/${id}`, {
        headers: {
            token,
        },
    })
    .then((res) => res.json())
    .then((response) => {
        
        const { data } = response;
        let editOutput = ``;
        editOutput += `
            
            <input class="edit-input" id="name" type="text" value="${data[0].name}"></input>
            <button type="button" onclick="editName(${data[0].id})" class="btn btn-cancel-modal"><a>Update</a></button>
        `;
        document.getElementById('editOutput').innerHTML = editOutput;
    })
    }

    const nameError = document.getElementById('error-name');

    function editName(id) {
        const name = document.getElementById('name').value;
        
    
        fetch(`${urlInUse}/parties/${id}/name`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': token,
            },
            body: JSON.stringify(
                {
                  name,
                },
                ),
        })
        .then((res) => res.json())
        .then((response) => {
            const { error, data } = response;
            if (error) {
                if (error.name) {
                    addDynamicDiv(error.name, nameError, 'divNewError');
                }
            } else {
                redirect('adminViewParties.html');
            }
        })
        .catch((error) => console.log(error))
    }