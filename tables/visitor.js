const db = require('../db');

// Create
async function createVisitor(profileId, visitorName, visitorContact, visitorInTime, visitorOutTime, visitorVehicle) {
    const query = 'INSERT INTO visitors (profile_id, visitor_name, visitor_contact, visitor_in_time, visitor_out_time, visitor_vehicle, created_at) VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, visitorName, visitorContact, visitorInTime, visitorOutTime, visitorVehicle];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getVisitorsByProfileId(profileId) {
    const query = 'SELECT * FROM visitors WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateVisitor(visitorId, updates) {
    const { visitorName, visitorContact, visitorInTime, visitorOutTime, visitorVehicle } = updates;
    const query = 'UPDATE visitors SET visitor_name = $1, visitor_contact = $2, visitor_in_time = $3, visitor_out_time = $4, visitor_vehicle = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *';
    const values = [visitorName, visitorContact, visitorInTime, visitorOutTime, visitorVehicle, visitorId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteVisitor(visitorId) {
    const query = 'DELETE FROM visitors WHERE id = $1';
    await db.query(query, [visitorId]);
}

module.exports = { createVisitor, getVisitorsByProfileId, updateVisitor, deleteVisitor };
