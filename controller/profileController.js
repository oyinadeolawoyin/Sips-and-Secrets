const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

async function profile(req, res) {
    console.log("username", req.user.username);
    let user = await db.getUser(req.user.username);
    console.log("use", user);
    res.render("profile", { user });
}

async function updateForm(req, res) {
    let user = await db.getUser(req.user.username);
    res.render("updateProfile", { user });
}

async function updateProfile(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("updateProfile", {
            errors:  errors.array(),
        });
    }   
    try {
        const { firstname, lastname, email, username, password } = req.body;
          const hashedPassword = await bcrypt.hash(password, 10);
          await db.updateProfile(firstname, lastname, username, email, hashedPassword, req.user.id);
          res.redirect(`/profile/${req.user.username}`);
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }      
}

async function posterProfile(req, res) {
    console.log("username", req.params.username);
    let poster = await db.getUser(req.params.username);
    res.render("postProfile", { poster });
}

module.exports = {
    profile,
    updateForm,
    updateProfile,
    posterProfile
}