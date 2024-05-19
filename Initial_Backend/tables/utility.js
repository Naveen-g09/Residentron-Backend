const db = require('../db');

// Create
async function createUtility(profileId, utilityId, usedDate, name) {
    const query = 'INSERT INTO utility (profile_id, utility_id, used_date, name, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, utilityId, usedDate, name];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getUtilitiesByProfileId(profileId) {
    const query = 'SELECT * FROM utility WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateUtility(utilityId, updates) {
    const { name, usedDate } = updates;
    const query = 'UPDATE utility SET name = $1, used_date = $2, updated_at = CURRENT_TIMESTAMP WHERE utility_id = $3 RETURNING *';
    const values = [name, usedDate, utilityId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteUtility(utilityId) {
    const query = 'DELETE FROM utility WHERE utility_id = $1';
    await db.query(query, [utilityId]);
}

module.exports = { createUtility, getUtilitiesByProfileId, updateUtility, deleteUtility };
