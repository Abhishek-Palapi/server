const express = require('express');
const routes = require('../routes');
const bodyParser = require('body-parser');
const cors = require('cors')



const server = express();
server.use(cors()) // cors
server.use( bodyParser.json() );    // json parsing for body 
server.use(bodyParser.urlencoded({ extended: true }));


server.use('/api', routes);

module.exports = server;