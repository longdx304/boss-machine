const express = require('express');
const ideasRouter = express.Router();

const {getAllFromDatabase, addToDatabase} = require('../db'); //import database's function

ideasRouter.get('/', (req, res, next) => { //Route for GET request
    const ideas = getAllFromDatabase('ideas'); //retrieve array of data from db
    res.send(ideas); //send back respond with data
});

ideasRouter.post('/', (req, res, next) => { //Route for POST Request to create new obj and save to db
    const idea = addToDatabase('ideas' ,req.body); //use addToDatabase(name, obj from req.body) to add obj and store return value
    res.status(201).send(idea); //send 201 CREATED status
});

module.exports = ideasRouter;