// implement your API here
const express = require('express'); //import express package

const dbModel = require('./data/db');

const server = express(); //creates the server


//watch for connections on port 8000
const port = 8000;
server.listen(port, () => console.log('\nserver running\n'))