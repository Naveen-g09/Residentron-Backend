const db = require('../db');

// Create
async function createService(profileId, serviceId, serviceName, serviceMan, subscription) {
    const query = 'INSERT INTO services (profile_id, service_id, service_name, service_man, subscription, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, serviceId, serviceName, serviceMan, subscription];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getServicesByProfileId(profileId) {
    const query = 'SELECT * FROM services WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateService(serviceId, updates) {
    const { serviceName, serviceMan, subscription } = updates;
    const query = 'UPDATE services SET service_name = $1, service_man = $2, subscription = $3, updated_at = CURRENT_TIMESTAMP WHERE service_id = $4 RETURNING *';
    const values = [serviceName, serviceMan, subscription, serviceId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteService(serviceId) {
    const query = 'DELETE FROM services WHERE service_id = $1';
    await db.query(query, [serviceId]);
}

module.exports = { createService, getServicesByProfileId, updateService, deleteService };
