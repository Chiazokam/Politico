//Forgot Password Modal

let displayModal = document.querySelector("#forgotPass");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".btn-cancel-modal");


displayModal.addEventListener('click', function(){
  modal.style.display = "block";
});

modalClose.addEventListener('click', function(){
  modal.style.display = "none";
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}