const express = require('express');
const minionsRouter = express.Router();

const {getAllFromDatabase, addToDatabase} = require('../db'); //import database's function

minionsRouter.get('/', (req, res, next) => { //Route for GET request
    const minions = getAllFromDatabase('minions'); //retrieve array of all minions from db and save to minions
    res.send(minions); //send back respond with array of all minions
});

minionsRouter.post('/', (req, res, next) => { //Route for POST Request to create new minion and save to db
    const minion = addToDatabase('minions' ,req.body); //use addToDatabase(name, obj from req.body) to add minion and store return value
    res.status(201).send(minion); //send 201 CREATED status
});



module.exports = minionsRouter;