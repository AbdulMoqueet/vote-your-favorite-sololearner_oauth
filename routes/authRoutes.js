require('../controllers/googleAuthController');
const passport = require('passport');
const { Router } = require('express');

const router = Router();

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
    });


module.exports = router;