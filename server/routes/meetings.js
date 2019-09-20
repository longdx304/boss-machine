const express = require('express');
const meetingsRouter = express.Router();

const {deleteAllFromDatabase, getAllFromDatabase, createMeeting, addToDatabase} = require('../db'); //import database's function

meetingsRouter.get('/', (req, res, next) => { //Route for GET request
    const meetings = getAllFromDatabase('meetings'); //retrieve array of data from db
    res.send(meetings); //send back respond with data
});

meetingsRouter.post('/', (req, res, next) => { //Route for POST Request to create new obj and save to db
    const meeting = addToDatabase('meetings', createMeeting()); //use addToDatabase(name, obj from db createMeeting()) to add obj and store return value
    res.status(201).send(meeting); //send 201 CREATED status
});

meetingsRouter.delete('/', (req, res, next) => { //Route for DELETE request to delete all meeting
    deleteAllFromDatabase('meetings'); //use deleteAllFromDatabase(model)
    res.status(204).send(); //send 204 status
});

module.exports = meetingsRouter;