const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');
const cookieSession = require('cookie-session');
const apiRoutes = require('./routes/apiRoutes');
const initialData = require('./utils/initialData');

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



// if (process.env.NODE_ENV === 'production') {
app.use(express.static('./client/build'));
// }

// <---------- Uncomment for Initial one time data.
//initialData();  

// app.use((req, res) => {
//     res.status(404).send('404 Not Found!');
// });

app.listen(process.env.PORT || 5000, console.log(
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Server started on port ${process.env.PORT || 5000}`
));