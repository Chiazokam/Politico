//Responsive Hamburger

let hamburger = document.querySelector('.menu-ham');
let nav = document.querySelector('.nav-menu');

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  nav.classList.toggle('open');
}

//Forgot Password Modal

let displayModal = document.querySelector("#forgotPass");
let modal = document.querySelector(".modal");
let modalClose = document.querySelector(".btn-cancel-modal");

displayModal.addEventListener('click', function(){
  modal.style.display = "block";
});

modalClose.addEventListener('click', function(){
  modal.style.display = "none";
})