const db = require('../db');

// Create
async function createEvent(profileId, eventName, eventDateTime, eventType) {
    const query = 'INSERT INTO events (profile_id, event_name, event_date_time, event_type, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, eventName, eventDateTime, eventType];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getEventsByProfileId(profileId) {
    const query = 'SELECT * FROM events WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateEvent(eventId, updates) {
    const { eventName, eventDateTime, eventType } = updates;
    const query = 'UPDATE events SET event_name = $1, event_date_time = $2, event_type = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';
    const values = [eventName, eventDateTime, eventType, eventId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteEvent(eventId) {
    const query = 'DELETE FROM events WHERE id = $1';
    await db.query(query, [eventId]);
}

module.exports = { createEvent, getEventsByProfileId, updateEvent, deleteEvent };
