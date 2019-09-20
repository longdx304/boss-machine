const express = require('express');
const ideasRouter = express.Router();

const {deleteFromDatabasebyId, getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase} = require('../db'); //import database's function

ideasRouter.param('ideaId', (req, res, next, id) => { //check obj ID and attach obj to request
    req.idea = getFromDatabaseById('ideas', id);
    if (!req.idea) {
        const err = new Error('Invalid idea id');
        err.status = 400; //create error
        return next(err); //return error
    }
    next();
});

ideasRouter.get('/', (req, res, next) => { //Route for GET request
    const ideas = getAllFromDatabase('ideas'); //retrieve array of data from db
    res.send(ideas); //send back respond with data
});

ideasRouter.post('/', (req, res, next) => { //Route for POST Request to create new obj and save to db
    const idea = addToDatabase('ideas' ,req.body); //use addToDatabase(name, obj from req.body) to add obj and store return value
    res.status(201).send(idea); //send 201 CREATED status
});

ideasRouter.get('/:ideaId', (req, res, next) => { //Route for GET request to retrieve info for one obj
    res.status(200).send(req.idea); //send res status 200 with obj instance
});

ideasRouter.put('/:ideaId', (req, res, next) => { //Route for PUT request to update single obj by id
    const idea = updateInstanceInDatabase('ideas', req.body); //update db using updateInstanceInDatabase(model, obj from req.body)
    res.status(200).send(idea); //send res status 200 with updated obj
});

ideasRouter.delete('/:ideaId', (req, res, next) => { //Route to DELETE request for single obj
    deleteFromDatabasebyId('ideas', req.params.ideaId);
    res.status(204).send(); //send res status 204
});

module.exports = ideasRouter;