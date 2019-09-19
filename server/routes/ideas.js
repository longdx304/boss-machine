const express = require('express');
const ideasRouter = express.Router();

const {getAllFromDatabase} = require('../db'); //import database's function

ideasRouter.get('/', (req, res, next) => { //Route for GET request
    const ideas = getAllFromDatabase('ideas'); //retrieve array of data from db
    res.send(ideas); //send back respond with data
});


module.exports = ideasRouter;