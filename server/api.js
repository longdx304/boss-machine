const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./routes/minions'); //import minionsRouter
apiRouter.use('/minions', minionsRouter); //mount minionsRouter for '/minions' path.

const ideasRouter = require('./routes/ideas');
apiRouter.use('/ideas', ideasRouter);

const meetingsRouter = require('./routes/meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
