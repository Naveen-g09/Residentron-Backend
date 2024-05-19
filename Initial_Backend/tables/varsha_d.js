// varsha_d.js

const db = require('../db');

// Function to create a new record in the varsha_d_wing table
async function createVarshaDWing(roomNumber, name, ownershipType, parking) {
    const query = 'INSERT INTO varsha_d_wing (room_number, name, ownership_type, parking) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [roomNumber, name, ownershipType, parking];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Function to get a varsha_d_wing record by its ID
async function getVarshaDWingById(id) {
    const query = 'SELECT * FROM varsha_d_wing WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
}

// Function to get a varsha_d_wing record by room number
async function getVarshaDWingByRoomNumber(roomNumber) {
    const query = 'SELECT * FROM varsha_d_wing WHERE room_number = $1';
    const { rows } = await db.query(query, [roomNumber]);
    return rows;
}

// Function to get a varsha_d_wing record by name
async function getVarshaDWingByName(name) {
    const query = 'SELECT * FROM varsha_d_wing WHERE name = $1';
    const { rows } = await db.query(query, [name]);
    return rows;
}

// Function to get a varsha_d_wing record by ownership type
async function getVarshaDWingByOwnershipType(ownershipType) {
    const query = 'SELECT * FROM varsha_d_wing WHERE ownership_type = $1';
    const { rows } = await db.query(query, [ownershipType]);
    return rows;
}

// Function to get all varsha_d_wing records
async function getAllVarshaDWing() {
    const query = 'SELECT * FROM varsha_d_wing';
    const { rows } = await db.query(query);
    return rows;
}

// Function to update a varsha_d_wing record
async function updateVarshaDWing(id, roomNumber, name, ownershipType, parking) {
    const query = 'UPDATE varsha_d_wing SET room_number = $1, name = $2, ownership_type = $3, parking = $4 WHERE id = $5 RETURNING *';
    const values = [roomNumber, name, ownershipType, parking, id];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Function to delete a varsha_d_wing record
async function deleteVarshaDWing(id) {
    const query = 'DELETE FROM varsha_d_wing WHERE id = $1';
    await db.query(query, [id]);
}

module.exports = {
    createVarshaDWing,
    getVarshaDWingById,
    getVarshaDWingByRoomNumber,
    getVarshaDWingByName,
    getVarshaDWingByOwnershipType,
    getAllVarshaDWing,
    updateVarshaDWing,
    deleteVarshaDWing
};
