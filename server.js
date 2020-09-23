const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require('passport');

const googleAuthController = require('./controllers/googleAuthController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session()); 
googleAuthController(app);


// All Routes
// app.use(googleAuthRoute);

app.use((req, res) => {
    res.status(404).send('404 Not Found!');
});

// connecting to mongodb
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log("Mondodb Connected..."))
    .catch(err => console.error(err));

app.listen(process.env.PORT || 5000, console.log(
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} Server started on port ${process.env.PORT || 5000}...`
));