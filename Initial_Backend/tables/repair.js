const db = require('../db');

// Create
async function createRepair(profileId, applianceName, repairPerson) {
    const query = 'INSERT INTO repair (profile_id, appliance_name, repair_person, created_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, applianceName, repairPerson];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getRepairsByProfileId(profileId) {
    const query = 'SELECT * FROM repair WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateRepair(repairId, updates) {
    const { applianceName, repairPerson } = updates;
    const query = 'UPDATE repair SET appliance_name = $1, repair_person = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *';
    const values = [applianceName, repairPerson, repairId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteRepair(repairId) {
    const query = 'DELETE FROM repair WHERE id = $1';
    await db.query(query, [repairId]);
}

module.exports = { createRepair, getRepairsByProfileId, updateRepair, deleteRepair };
