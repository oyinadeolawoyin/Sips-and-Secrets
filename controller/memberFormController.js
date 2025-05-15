const db = require("../db/queries");

function memberForm(req, res) {
    res.render("memberForm");
}

async function createMember(req, res) {
    const { username, passcodeMember, passcodeAdmin } = req.body;
    if (passcodeMember === "MEMBER" && passcodeAdmin === ""){
        console.log("first if, m", passcodeMember, "a", passcodeAdmin, 'u', username);
        await db.createMember(username, true, false);
        res.redirect("/profile");
    } 
    else if(passcodeMember === "" && passcodeAdmin === "ADMIN") {
        console.log("second if m", passcodeMember, "a", passcodeAdmin, 'u', username);
        await db.createMember(username, false, true);
        res.redirect("/profile");
    }
    else if(passcodeMember === "MEMBER" && passcodeAdmin === "ADMIN") {
        console.log("third if, m", passcodeMember, "a", passcodeAdmin, 'u', username);
        await db.createMember(username, true, true);
        res.redirect("/profile");
    }
    else {
        res.render("memberForm", {
            errors: [{ msg: "Incorrect Passcodes." }],
        });
    }
}


module.exports = {
    memberForm,
    createMember
}