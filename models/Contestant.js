const mongoose = require('mongoose');

const contestantSchema = new mongoose.Schema({
    soloId: {
        type: String
    },
    
    name: {
        type: String
    },

    votes: {
        type: Number,
        default: 0
    },

    votedBy: {
        type: Array,
        default: []
    }
});

const Contestant = mongoose.model('Contestant', contestantSchema);

module.exports = Contestant;