const { validationResult } = require("express-validator");
const db = require("../db/queries");

function getcontentForm(req, res) {
    res.render("contentForm");
}

async function createContent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render("contentForm", {
            errors:  errors.array(),
        });
    }   
    try {
        const { title, content } = req.body;
        console.log("t", title, "c", content, 'u', req.user.id);
        await db.createContent(title, content, req.user.id);
          res.redirect("/profile/<%= user.username %>");
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server Error");
    }      
}

module.exports = {
   getcontentForm,
    createContent
}