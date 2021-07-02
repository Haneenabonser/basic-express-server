'use strict';

const express = require('express');
const app = express();
const notFoundHandler = require('./error-handlers/404');
const errorHandler = require('./error-handlers/500');
const logger = require('./middleware/logger');
const validator = require('./middleware/validator');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger);


app.get('/', homeHandler);
app.get('/bad', badHandler);
app.get('/person', validator, personHandler);


// GET http://localhost:3000/person?name=haneen
function personHandler (req, res){
    const output = {
        name:req.query.name
      }
      res.json(output);
    };
    
function homeHandler (req, res){
    res.status(200).send('Hello from Backend');
};

function badHandler(req, res){
    throw new Error('Something went wrong');
};

app.use('*', notFoundHandler);
app.use(errorHandler);

function start(port) {
    app.listen(port, () => console.log(`Listening on ${port}`))
};

module.exports = {
    app: app,
    start: start
};