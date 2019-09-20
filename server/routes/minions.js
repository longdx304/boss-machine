const express = require('express');
const minionsRouter = express.Router();

const {getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase} = require('../db'); //import database's function

minionsRouter.param('minionId', (req, res, next, id) => { //check obj ID and attach minion to request
    req.minion = getFromDatabaseById('minions', id);
    if (!req.minion) {
        const err = new Error('Invalid minion id');
        err.status = 400; //create error
        return next(err); //return error
    }
    next();
});

minionsRouter.get('/', (req, res, next) => { //Route for GET request to retrieve info for all objs
    const minions = getAllFromDatabase('minions'); //retrieve array of all minions from db and save to minions
    res.send(minions); //send back respond with array of all minions
});

minionsRouter.post('/', (req, res, next) => { //Route for POST Request to create new minion and save to db
    const minion = addToDatabase('minions' ,req.body); //use addToDatabase(name, obj from req.body) to add minion and store return value
    res.status(201).send(minion); //send 201 CREATED status
});

minionsRouter.get('/:minionId', (req, res, next) => { //Route for GET request to retrieve info for one obj
    res.status(200).send(req.minion); //send res status 200 with obj instance
});

minionsRouter.put('/:minionId', (req, res, next) => { //Route for PUT request to update single obj by id
    const minion = updateInstanceInDatabase('minions', req.body); //update db using updateInstanceInDatabase(model, obj from req.body)
    res.status(200).send(minion); //send res status 200 with updated obj
});

module.exports = minionsRouter;