/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */

setTimeout(() => {
  const displayDeleteModal = document.querySelectorAll(".delete");
  const deleteModal = document.querySelector(".modal-delete");
  const closeDeleteModal = document.querySelector(".delete-btn");
  const editModal = document.querySelector(".modal-edit");
  const confirmDelete = document.querySelector(".confirm-delete");
    
    
  let id;

  displayDeleteModal.forEach((modal) => { 
    modal.addEventListener('click', function(e) {
    id = e.target.attributes.key.value;
    deleteModal.style.display = 'block'
    })
  })
    
  closeDeleteModal.addEventListener('click', function() {
    deleteModal.style.display = "none";
  })
    
    window.onclick = function(event) {
      if (event.target === deleteModal) {
        deleteModal.style.display = "none";
      }
      if (event.target === editModal) {
        editModal.style.display = "none";
      }
    }

    confirmDelete.addEventListener('click', () => {
        fetch(`${urlInUse}/parties/${id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                Accept: 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'token': token,
            },
        })
        .then((res) => res.json())
        .then((response) => {
            redirect('adminViewParties.html');
        })
    })
    }, 1000)

