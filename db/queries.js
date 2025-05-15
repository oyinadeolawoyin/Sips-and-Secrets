const pool = require("./pool");

async function createProfile(firstname, lastname, username, email, password) {
    await pool.query("INSERT INTO profiles (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)", [firstname, lastname, username, email, password]);
};

async function getUsername(username) {
    const { rows } = await pool.query("SELECT * FROM profiles WHERE username = $1", [username]);
    return rows[0];
};

async function getUserId(id) {
    const { rows } = await pool.query("SELECT * FROM profiles WHERE id = $1", [id]);
    return rows[0];
}

async function createMember(username, membership, admin) {
    "UPDATE profiles SET admin = $3, membership = $2 WHERE username = $1",
    [username, membership, admin]
}

module.exports = {
    createProfile,
    getUsername,
    getUserId,
    createMember
}