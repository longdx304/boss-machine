const express = require('express');
const minionsRouter = express.Router();

const {getAllFromDatabase} = require('../db'); //import database's function

minionsRouter.get('/', (req, res, next) => { //Route for GET request
    const minions = getAllFromDatabase('minions'); //retrieve array of all minions from db and save to minions
    res.send(minions); //send back respond with array of all minions
});


module.exports = minionsRouter;