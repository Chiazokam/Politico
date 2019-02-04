//Responsive Hamburger

let hamburger = document.querySelector('.menu-ham');
let nav = document.querySelector('.nav-menu');

hamburger.addEventListener('click', toggleMenu);

function toggleMenu() {
  nav.classList.toggle('open');
}