[![Build Status](https://travis-ci.org/Chiazokam/Politico.svg?branch=develop)](https://travis-ci.org/Chiazokam/Politico)

[![Coverage Status](https://coveralls.io/repos/github/Chiazokam/Politico/badge.svg?branch=develop)](https://coveralls.io/github/Chiazokam/Politico?branch=develop)

# Politico
An app that enables citizens vote for different government offices transparently

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
* Have a text editor (vs-code, atom or sublime text) and
* Have Postman running on your local
* Set up postgres on your local with db name as

```
politico

```
* Assign the following to created db in the environment file

```
PASSWORD

USER

DB_PORT

DATABASE

HOST=localhost

```

### Installing

After cloning, `cd` into it and on your command line run `npm install` to automatically install all the dependencies in the `package.json` file.

```
e.g
user~
$ cd politico
user~/politico
$ npm install
```

Use `npm start` to start the app
```
e.g
user~/politico
$ npm start
```

### FUNCTIONAL API ENDPOINTS

<table>
<tr><th>S/N</th><th>HTTP VERBS</th><th>API ENDPOINTS</th><th>CORRESPONDING EFFECTS</th></tr>
<tr><td>1</td><td>POST</td> <td>/api/v1/auth/signup</td>  <td>Signs up a user</td></tr>
<tr><td>2</td><td>POST</td> <td>/api/v1/auth/login</td>  <td>Signs in a user</td></tr>
<tr><td>3</td><td>POST</td> <td>/api/v1/parties</td>  <td>Creates parties</td></tr>
<tr><td>4</td><td>POST</td> <td>/api/v1/offices</td>  <td>Creates an office</td></tr>
<tr><td>5</td><td>GET</td> <td>/api/v1/parties</td>  <td>Gets all parties</td></tr>
<tr><td>6</td><td>GET</td> <td>/api/v1/offices</td>  <td>Gets all offices</td></tr>
<tr><td>7</td><td>GET</td> <td>/api/v1/parties/:id</td>  <td>Gets one party</td></tr>
<tr><td>8</td><td>GET</td> <td>/api/v1/offices/:id</td>  <td>Gets one office</td></tr>
<tr><td>9</td><td>PATCH</td> <td>/api/v1/parties/:id/name</td>  <td>Edits the party name</td></tr>
<tr><td>10</td><td>DELETE</td> <td>/api/v1/parties/:id</td>  <td>Deletes a party</td></tr>
<tr><td>11</td><td>POST</td> <td>/api/v1/offices/:id/register</td>  <td>Registers a user as a candidate</td></tr>
<tr><td>12</td><td>POST</td> <td>/api/v1/votes</td>  <td>Creates a vote</td></tr>
<tr><td>13</td><td>GET</td> <td>/api/v1/office/:id/result</td>  <td>Gets the result for a particular office</td></tr>
</table>

## Built With
* [Javascript | NodeJs](https://nodejs.org/en/) - The web framework used
* [Node Package Manager](https://www.npmjs.com/) - Dependency Management
* [Mocha](https://mochajs.org/) - Testing framework

## UI/UX Template

* [Template]
* https://chiazokam.github.io/Politico
* https://chiazokam.github.io/Politico/Admin/adminProfile.html


## API Documentation
* [Politico](https://politico4.docs.apiary.io/)

## Versioning
Git-Hub 

## Project Board
(https://www.pivotaltracker.com/n/projects/2238819)

## Authors
* **Chiazokam Echeta** - *Initial work*

## Acknowledgments
* My ever supportive team during the project build up