const express = require("express");
const router = express.Router();
const passport = require('passport');
const logInController = require("../controller/logInController");
 

router.get("/", logInController.logInPage);

router.post('/', passport.authenticate('local', {
    successRedirect: `/profile/<%= req.user.username %>`,
    failureRedirect: '/logIn',
    failureFlash: true
}));

module.exports = router;