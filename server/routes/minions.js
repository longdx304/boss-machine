const express = require('express');
const minionsRouter = express.Router();

const {getAllFromDatabase, addToDatabase, getFromDatabaseById} = require('../db'); //import database's function

minionsRouter.get('/', (req, res, next) => { //Route for GET request to retrieve info for all objs
    const minions = getAllFromDatabase('minions'); //retrieve array of all minions from db and save to minions
    res.send(minions); //send back respond with array of all minions
});

minionsRouter.post('/', (req, res, next) => { //Route for POST Request to create new minion and save to db
    const minion = addToDatabase('minions' ,req.body); //use addToDatabase(name, obj from req.body) to add minion and store return value
    res.status(201).send(minion); //send 201 CREATED status
});

minionsRouter.get('/:minionId', (req, res, next) => { //Route for GET request to retrieve info for one obj
    const minion = getFromDatabaseById('minions', req.params.minionId); //retrieve minion using getFromDatabaseById(model, id from params.minionId)
    if (!minion) { //if retrieved obj is null
        const err = new Error('Invalid ID requested');
        err.status = 400; //create error
        return next(err); //return error
    }
    res.status(200).send(minion); //send res status 200 with obj instance
});

module.exports = minionsRouter;