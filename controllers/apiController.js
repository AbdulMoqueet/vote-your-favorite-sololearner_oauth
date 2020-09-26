const Contestant = require('../models/Contestant');

module.exports.userGet = (req, res) => {
  if (req.user) {
    return res.json({ message: 'User Is Login' });
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

    const { _id } = req.body;

    coder = await Contestant.findById(_id);
    const votes = ++coder.votes;
    console.log(votes);

    Contestant
      .updateOne({ _id }, { votes })
      .then(result => console.log(result));

    return res.json({ message: 'Voted Successfully' });

  } else {
    return res.status(400).json({ message: 'Not Login' });
  }





}