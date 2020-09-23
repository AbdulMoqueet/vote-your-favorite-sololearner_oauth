const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.initialize();

passport.serializeUser((user, done) => {
    done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
    User.findOne({ googleId: googleId }, function (err, user) {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    function (profile, cb) {
        console.log("profile:", profile);

        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;

        User.findOrCreate({ googleId }, { name, email }, function (err, user) {
            return cb(err, user);
        });
    }
));

module.exports = (app) => {

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', { failureRedirect: '/login' }),
        function (req, res) {
            res.send("success");
        });

}