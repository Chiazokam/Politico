
let displayPetitionModal = document.querySelector(".create-petition");
let petitionModal = document.querySelector(".modal-petition");
let petitionClose = document.querySelector(".cancel-petition");


displayPetitionModal.addEventListener('click', function(){
  petitionModal.style.display = "block";
});

petitionClose.addEventListener('click', function(){
  petitionModal.style.display = "none";
})

window.onclick = function(event) {
  if (event.target == petitionModal) {
    petitionModal.style.display = "none";
  }
}