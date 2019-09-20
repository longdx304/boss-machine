const express = require('express');
const ideasRouter = express.Router();

const {getAllFromDatabase, addToDatabase, getFromDatabaseById} = require('../db'); //import database's function

ideasRouter.get('/', (req, res, next) => { //Route for GET request
    const ideas = getAllFromDatabase('ideas'); //retrieve array of data from db
    res.send(ideas); //send back respond with data
});

ideasRouter.post('/', (req, res, next) => { //Route for POST Request to create new obj and save to db
    const idea = addToDatabase('ideas' ,req.body); //use addToDatabase(name, obj from req.body) to add obj and store return value
    res.status(201).send(idea); //send 201 CREATED status
});

ideasRouter.get('/:ideaId', (req, res, next) => { //Route for GET request to retrieve info for one obj
    const idea = getFromDatabaseById('ideas', req.params.ideaId); //retrieve minion using getFromDatabaseById(model, id from params.minionId)
    if (!idea) { //if retrieved obj is null
        const err = new Error('Invalid ID requested');
        err.status = 400; //create error
        return next(err); //return error
    }
    res.status(200).send(idea); //send res status 200 with obj instance
});

module.exports = ideasRouter;