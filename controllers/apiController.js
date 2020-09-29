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

const getContestant = async () => {

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
  return contestants;
}

module.exports.contestantGet = async (req, res) => {
  const contestants = await getContestant();

  return res.json({ contestants });

}

module.exports.votePost = async (req, res) => {

  if (req.user) {

    // if (!req.user.votedFor) {

    const { _id, userInfo } = req.body;

    let city='',
    region='',
    country='',
    network='';

    try {
      city = userInfo.city;
      region = userInfo.region;
      country = userInfo.country_name;
      network = userInfo.org;
    } catch (error) { }

    coder = await Contestant.findById(_id);
    const votes = ++coder.votes;
    const { votedBy } = coder;


    const user = await User.findByIdAndUpdate({ _id: req.user._id }, {
      votedFor: coder.name,
      votedAt: getDateTime(),
      city,
      region,
      country,
      network
    }, { new: true });


    votedBy.push({
      _id: user._id,
      googleId: user.googleId,
      name: user.name,
      email: user.email,
      dp: user.dp,
      votedAt: user.votedAt
    });


    const result = await Contestant.updateOne({ _id }, { votes, votedBy });

    const contestants = await getContestant();

    const myUser = {
      name: user.name,
      email: user.email,
      dp: user.dp,
      votedFor: user.votedFor
    }



    return res.json({ contestants, user: myUser });

    // } else {
    //   return res.status(400).json({ votedFor: req.user.votedFor});
    // }

  } else {
    return res.status(400).json({ message: 'Not Login' });
  }

}

module.exports.upVotesPost = async (req, res) => {

  const { _id } = req.body;

  if (_id) {

    const coder = await Contestant.findById(_id);

    const { votedBy } = coder;

    return res.json({ votedBy: votedBy, name: coder.name });
  } else {
    return res.status(400).json({ message: 'No id provided' });
  }

}