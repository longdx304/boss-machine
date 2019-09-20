const checkMillionDollarIdea = (req, res, next) => {
    const weeklyRevenue = Number(req.body.weeklyRevenue);
    const numWeeks = Number(req.body.numWeeks);
    if (!weeklyRevenue || !numWeeks) {
        return res.status(400).send('Invalid data');
    } else if (weeklyRevenue * numWeeks < 1000000) {
        return res.status(400).send('Idea NOT worth 1 Mil dollars');
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
