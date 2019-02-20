/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */

setTimeout(() => {
    const displayResultModal = document.querySelectorAll(".card-result");
    const resultModal = document.querySelector(".modal-result");
      
      
    let id;
  
    displayResultModal.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        id = e.target.attributes.key.value;

        fetch(`${urlInUse}/office/${id}/result`, {
            headers: {
                'token': token,
            },
        })
        .then((res) => res.json())
        .then((response) => {
            const { data } = response;
            let output = ``;
            data.forEach((result) => {
                output += `
                <div class="result">
                    <div class="result-candidate">
                        <p>${result.firstname} ${result.lastname}</p>
                    </div>
                    <div class="result-party">
                        <p>${result.party}</p>
                    </div>
                    <div class="result-votes">
                        <p>${result.votes} Vote(s)</p>
                    </div>
            </div>
                `;
                document.querySelector('.result-output').innerHTML = output;
            })

        })

      resultModal.style.display = 'block'
      })
    })
      
      window.onclick = (event) => {
        if (event.target === resultModal) {
          resultModal.style.display = "none";
        }
      }
      }, 1000)
