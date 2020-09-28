const Contestant = require('../models/Contestant');
const User = require('../models/User');
const { getDateTime } = require('../utils/utils');


module.exports.userGet = (req, res) => {
  if (req.user) {
    return res.json({
      user: {
        name: req.user.name,
        email: req.user.email,
        dp: req.user.dp,
        votedFor: req.user.votedFor
      }
    });
  } else {
    return res.status(400).json({ message: 'Not Login' });
  }
}


module.exports.contestantGet = async (req, res) => {

  function compare(a, b) {
    if (a.votes > b.votes) {
      return -1;
    }
    if (a.votes < b.votes) {
      return 1;
    }
    return 0;
  }


  const contestants = await Contestant.find().sort({ "name": 1 });

  contestants.sort(compare);

  return res.json({ contestants });

}

module.exports.votePost = async (req, res) => {

  if (req.user) {

    // if (!req.user.votedFor) {

    const { _id } = req.body;

    coder = await Contestant.findById(_id);
    const votes = ++coder.votes;
    const { votedBy } = coder;


    const user = await User.findByIdAndUpdate({ _id: req.user._id }, { votedFor: coder.name, votedAt: getDateTime() }, { new: true });


    votedBy.push({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      dp: user.dp,
      votedAt: user.votedAt
    });


    const result = await Contestant.updateOne({ _id }, { votes, votedBy });
    console.log(result);

    res.redirect('/api/contestants');

    // } else {
    //   return res.status(400).json({ message: 'Voted Already'});
    // }

  } else {
    return res.status(400).json({ message: 'Not Login' });
  }

}

module.exports.upVotesPost = async (req, res) => {

  const { _id } = req.body;
  console.log(req.body);

  if (_id) {

    const coder = await Contestant.findById(_id);

    const {votedBy} = coder;

    console.log(votedBy);

return res.json({ votedBy: votedBy, name:coder.name });
  } else {
    return res.status(400).json({ message: 'No id provided' });
  }

}