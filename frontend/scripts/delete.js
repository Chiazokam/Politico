
setTimeout(() => {
  let displayDeleteModal = document.querySelectorAll(".delete");
  let deleteModal = document.querySelector(".modal-delete");
  let closeDeleteModal = document.querySelector(".delete-btn");
  let editModal = document.querySelector(".modal-edit");
    
    
  displayDeleteModal.forEach(modal => {
  modal.addEventListener('click', function() {
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
    }, 1000)

    setTimeout(() => {
        let displayEditModal = document.querySelectorAll(".edit");
        let editModal = document.querySelector(".modal-edit");
        let closeEditModal = document.querySelector(".edit-btn");
          
          
        displayEditModal.forEach(modal => {
        modal.addEventListener('click', function() {
          editModal.style.display = 'block'
          })
        })
          
        closeEditModal.addEventListener('click', function() {
          editModal.style.display = "none";
        })
          
        // window.addEventListener('click', function() {
        //     if (event.target === editModal) {
        //         editModal.style.display = "none";
        //       }
        // })
        //   window.onclick = function(event) {
        //     if (event.target === editModal) {
        //       editModal.style.display = "none";
        //     }
        //   }
          }, 1000)
    