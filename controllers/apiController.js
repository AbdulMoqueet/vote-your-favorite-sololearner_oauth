const Contestant = require('../models/Contestant');

module.exports.userGet = (req, res) => {
    if (req.user) {
        return res.json({ message: 'User Is Login' });
    } else {
        return res.status(400).json({ message: 'Not Login' });
    }
}


module.exports.contestantGet = async (req, res) => {

    const contestants = await Contestant.find();

    return res.json({ contestants });

}