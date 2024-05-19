const db = require('../db');

// Create
async function createAmenity(profileId, amenityName, bookingDate, bookingTime) {
    const query = 'INSERT INTO amenities (profile_id, amenity_name, booking_date, booking_time, created_at, updated_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, amenityName, bookingDate, bookingTime];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getAmenitiesByProfileId(profileId) {
    const query = 'SELECT * FROM amenities WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateAmenity(amenityId, updates) {
    const { amenityName, bookingDate, bookingTime } = updates;
    const query = 'UPDATE amenities SET amenity_name = $1, booking_date = $2, booking_time = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';
    const values = [amenityName, bookingDate, bookingTime, amenityId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteAmenity(amenityId) {
    const query = 'DELETE FROM amenities WHERE id = $1';
    await db.query(query, [amenityId]);
}

module.exports = { createAmenity, getAmenitiesByProfileId, updateAmenity, deleteAmenity };
