
let displayResetModal = document.querySelector(".reset-password");
let resetModal = document.querySelector(".modal-reset");
let modalClose = document.querySelector(".btn-cancel-modal");


displayResetModal.addEventListener('click', function(){
  resetModal.style.display = "block";
});

modalClose.addEventListener('click', function(){
  resetModal.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == resetModal) {
    resetModal.style.display = "none";
  }
}




let displayDeleteModal = document.querySelector(".delete");
let deleteModal = document.querySelector(".modal-delete");
let closeDeleteModal = document.querySelector(".delete-btn");


displayDeleteModal.addEventListener('click', function(){
  deleteModal.style.display = "block";
});

closeDeleteModal.addEventListener('click', function(){
  deleteModal.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}