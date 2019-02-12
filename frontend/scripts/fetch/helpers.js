/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const localUrl = 'http://localhost:3000/api/v1';
const herokuUrl = 'https://politico-voting-app.herokuapp.com/api/v1';

const urlInUse = herokuUrl;

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

function redirect(destination) {
    window.location = destination;
}

function clearErrorDiv(div) {
    div.innerHTML = '';
}

function clearErrorOnFocus(inputDiv, errorDiv) {
    inputDiv.addEventListener('focus', () => {
        errorDiv.innerHTML = '';
    })
}