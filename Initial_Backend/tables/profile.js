const db = require('../db');

// Create
async function createProfile(name, email, password, phoneNumber) {
    const query = 'INSERT INTO profile (name, email, password, phone_number) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, email, password, phoneNumber];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getProfileByEmail(email) {
    const query = 'SELECT * FROM profile WHERE email = $1';
    const { rows } = await db.query(query, [email]);
    return rows[0];
}

async function getProfileById(id) {
    const query = 'SELECT * FROM profile WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
}

// Update
async function updateProfile(id, updates) {
    const { name, email, password, phoneNumber } = updates;
    const query = 'UPDATE profile SET name = $1, email = $2, password = $3, phone_number = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5 RETURNING *';
    const values = [name, email, password, phoneNumber, id];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteProfile(id) {
    const query = 'DELETE FROM profile WHERE id = $1';
    await db.query(query, [id]);
}

module.exports = { createProfile, getProfileByEmail, getProfileById, updateProfile, deleteProfile };
