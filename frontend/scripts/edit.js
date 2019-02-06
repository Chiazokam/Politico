/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable arrow-parens */

setTimeout(() => {
    let displayEditModal = document.querySelectorAll('.edit');
    let editModal = document.querySelector('.modal-edit');
    let deleteModal = document.querySelector('.modal-delete');
      
      
    displayEditModal.forEach(modal => {
    modal.addEventListener('click', () => {
      editModal.style.display = 'block';
      })
    })

    window.onclick = function(event) {
        if (event.target === deleteModal) {
          deleteModal.style.display = 'none';
        }
        if (event.target === editModal) {
          editModal.style.display = 'none';
        }
      }
      }, 1000);