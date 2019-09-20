const express = require('express');
const workRouter = express.Router({mergeParams: true});

const {deleteFromDatabasebyId, addToDatabase, updateInstanceInDatabase, getAllFromDatabase} = require('../db');

workRouter.get('/', (req, res, next) => { //Route for GET request to get all work from specified minion
    const allWorks = getAllFromDatabase('work'); //use getAllFromDatabase(model) to get all works
    const minionWorks = [];
    allWorks.map(work => { //map to a function
        if (work.minionId === req.params.minionId) { //if id same as minionId
            minionWorks.push(work); //push to minionWorks array
        }
    });
    res.send(minionWorks); //send res with minionWorks
});

workRouter.post('/', (req, res, next) => { //Route to create new work obj and save to db
    res.status(201).send(addToDatabase('work', req.body)); //use addToDatabase(model, obj) too add work
});

workRouter.put('/:workId', (req, res, next) => { //Route for update single work by id
    if (req.body.minionId !== req.params.minionId) {
        return res.status(400).send("This work is not for this minion!");
    } else if (req.body.id !== req.params.workId) {
        return res.status(400).send("Wrong minions");
    }
    const updatedWork = updateInstanceInDatabase('work', req.body); //use updateInstanceInDatabase(model, obj) to update work obj
    res.status(200).send(updatedWork);
});

workRouter.delete('/:workId', (req, res, next) => { // Route for delete single work by id
    deleteFromDatabasebyId('work', req.params.workId); //use deleteFromDatabasebyId(model, id) to delete
    res.status(204).send(); 
});

module.exports = workRouter;