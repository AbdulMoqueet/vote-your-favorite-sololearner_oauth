const { Router } = require('express');

const { contestantGet, userGet, votePost, upVotesPost } = require('../controllers/apiController');


const router = Router();

router.get("/api/user", userGet);
router.get("/api/user/signout", (req, res) => {
    req.logout();
    console.log('logout');
    return res.json({ message: 'Logged Out' });
});


router.get("/api/contestants", contestantGet);
router.post("/api/vote", votePost);
router.post("/api/upvotes", upVotesPost);




module.exports = router;