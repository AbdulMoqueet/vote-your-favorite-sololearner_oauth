const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { getDateTime } = require('../utils/utils');

passport.initialize();

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {

        const googleId = profile.id;
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const dp = profile.photos[0].value;
        const createdAt = getDateTime();

        const existingUser = await User.findOne({googleId});

        if(existingUser){
            const finalUser = await User.findByIdAndUpdate(existingUser._id, {lastLogin: getDateTime()}, {new: true});
            done(null, finalUser);
        }else{
            const user = await User.create({ googleId, name, email, dp, createdAt, lastLogin: createdAt });
            done(null, user);
        }
    }
);

passport.use(googleStrategy);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser( async (_id, done) => {
    const user = await User.findById(_id);
    done(null, user);
});