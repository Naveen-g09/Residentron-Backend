const db = require('../db');

// Create
async function createUser(username, password, email) {
    const query = 'INSERT INTO auth (username, password, email) VALUES ($1, $2, $3) RETURNING *';
    const values = [username, password, email];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getUserByUsername(username) {
    const query = 'SELECT * FROM auth WHERE username = $1';
    const { rows } = await db.query(query, [username]);
    return rows[0];
}

async function getUserByEmail(email) {
    const query = 'SELECT * FROM auth WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
}

// Update
async function updateUserPassword(username, newPassword) {
    const query = 'UPDATE auth SET password = $1 WHERE username = $2 RETURNING *';
    const values = [newPassword, username];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteUser(username) {
    const query = 'DELETE FROM auth WHERE username = $1';
    await db.query(query, [username]);
}

module.exports = { createUser, getUserByUsername, getUserByEmail, updateUserPassword, deleteUser };
