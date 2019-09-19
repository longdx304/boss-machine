const express = require('express');
const meetingsRouter = express.Router();

const {getAllFromDatabase} = require('../db'); //import database's function

meetingsRouter.get('/', (req, res, next) => { //Route for GET request
    const meetings = getAllFromDatabase('meetings'); //retrieve array of data from db
    res.send(meetings); //send back respond with data
});


module.exports = meetingsRouter;