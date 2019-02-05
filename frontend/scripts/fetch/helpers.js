/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

document.querySelector('.logout').addEventListener('click', logOut);

function logOut() {
    localStorage.removeItem('token');
    window.location = '../index.html';
}

function addDynamicDiv(innerHTMLString, errorDiv, divId) {
    const newDiv = document.createElement('div');
    newDiv.id = divId;
    newDiv.innerHTML = innerHTMLString;
    errorDiv.appendChild(newDiv);
    errorDiv.style.visibility = 'visible';
  }

function doesInputHaveInteger(input) {
    return /\d/.test(input);
}