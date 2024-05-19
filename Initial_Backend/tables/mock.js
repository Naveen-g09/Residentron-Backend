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


const db = require('../db');

// Create
async function createTransaction(profileId, transactionId, amount) {
    const query = 'INSERT INTO transaction (profile_id, transaction_id, amount, created_date) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *';
    const values = [profileId, transactionId, amount];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read
async function getTransactionsByProfileId(profileId) {
    const query = 'SELECT * FROM transaction WHERE profile_id = $1';
    const { rows } = await db.query(query, [profileId]);
    return rows;
}

// Update
async function updateTransactionAmount(transactionId, newAmount) {
    const query = 'UPDATE transaction SET amount = $1 WHERE transaction_id = $2 RETURNING *';
    const values = [newAmount, transactionId];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete
async function deleteTransaction(transactionId) {
    const query = 'DELETE FROM transaction WHERE transaction_id = $1';
    await db.query(query, [transactionId]);
}

module.exports = { createTransaction, getTransactionsByProfileId, updateTransactionAmount, deleteTransaction };


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
