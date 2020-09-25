const { Router } = require('express');

const { contestantGet, userGet } = require('../controllers/apiController');


const router = Router();

router.get("/api/user", userGet);

router.get("/api/contestants", contestantGet);


module.exports = router;