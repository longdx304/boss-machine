const checkMillionDollarIdea = (req, res, next) => {
    const ideaValue = req.body.weeklyRevenue * req.body.numWeeks; //calculate idea value
    if (ideaValue < 1000000) { //if not worth at least 1 mil
        const err = new Error('Idea NOT worth 1 Mil dollars');
        err.status = 400;
        return next(err); //return error 
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
