const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const cookieSession = require('cookie-session');
const apiRoutes = require('./routes/apiRoutes');
// const Contestant = require('./models/Contestant');

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.REACT_APP_URL
}));

app.use(express.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');


app.use(authRoutes);
app.use(apiRoutes);

app.use((req, res) => {
    res.status(404).send('404 Not Found!');
});

// connecting to mongodb
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("Mondodb Connected..."))
    .catch(err => console.error(err));


// const arr = [
//     {
//         soloId: '12942084',
//         name: 'Aakaanksha 💕'
//     },
//     {
//         soloId: '4586359',
//         name: 'Serena Yvonne'
//     },
//     {
//         soloId: '12731601',
//         name: 'Man Of Action'
//     },
//     {
//         soloId: '5371585',
//         name: 'Sick L̲̅i̲̅n̲̅e̲̅ B̶r̶o̶🌡️'
//     },
//     {
//         soloId: '4354920',
//         name: 'Calviղ'
//     },
//     {
//         soloId: '197327',
//         name: 'Burey'
//     },
//     {
//         soloId: '2551505',
//         name: 'Nikolay Nachev'
//     },
//     {
//         soloId: '8518623',
//         name: 'ChillPill'
//     },
//     {
//         soloId: '7038378',
//         name: 'Arb Rahim Badsa'
//     },
//     {
//         soloId: '12447674',
//         name: 'NiKi🌸 SY💕'
//     },
//     {
//         soloId: '8175030',
//         name: 'Mitali'
//     }
// ];

//     Contestant.insertMany(arr, function(error, docs) {
//         if(error)
//         console.log(error);
//         else
//         console.log('saved...');
//     });

app.listen(process.env.PORT || 5000, console.log(
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Server started on port ${process.env.PORT || 5000}`
));