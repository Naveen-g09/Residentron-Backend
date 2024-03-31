// varsha_c_wing.js

const db = require('../db');

// Function to create a new record in the varsha_c_wing table
async function createVarshaCWing(roomNumber, name, ownershipType, parking) {
    const query = 'INSERT INTO varsha_c_wing (room_number, name, ownership_type, parking) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [roomNumber, name, ownershipType, parking];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Function to get a varsha_c_wing record by its ID
async function getVarshaCWingById(id) {
    const query = 'SELECT * FROM varsha_c_wing WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
}

// Function to get a varsha_c_wing record by room number
async function getVarshaCWingByRoomNumber(roomNumber) {
    const query = 'SELECT * FROM varsha_c_wing WHERE room_number = $1';
    const { rows } = await db.query(query, [roomNumber]);
    return rows;
}

// Function to get a varsha_c_wing record by name
async function getVarshaCWingByName(name) {
    const query = 'SELECT * FROM varsha_c_wing WHERE name = $1';
    const { rows } = await db.query(query, [name]);
    return rows;
}

// Function to get a varsha_c_wing record by ownership type
async function getVarshaCWingByOwnershipType(ownershipType) {
    const query = 'SELECT * FROM varsha_c_wing WHERE ownership_type = $1';
    const { rows } = await db.query(query, [ownershipType]);
    return rows;
}

// Function to get all varsha_c_wing records
async function getAllVarshaCWing() {
    const query = 'SELECT * FROM varsha_c_wing';
    const { rows } = await db.query(query);
    return rows;
}

// Function to update a varsha_c_wing record
async function updateVarshaCWing(id, roomNumber, name, ownershipType, parking) {
    const query = 'UPDATE varsha_c_wing SET room_number = $1, name = $2, ownership_type = $3, parking = $4 WHERE id = $5 RETURNING *';
    const values = [roomNumber, name, ownershipType, parking, id];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Function to delete a varsha_c_wing record
async function deleteVarshaCWing(id) {
    const query = 'DELETE FROM varsha_c_wing WHERE id = $1';
    await db.query(query, [id]);
}

module.exports = {
    createVarshaCWing,
    getVarshaCWingById,
    getVarshaCWingByRoomNumber,
    getVarshaCWingByName,
    getVarshaCWingByOwnershipType,
    getAllVarshaCWing,
    updateVarshaCWing,
    deleteVarshaCWing
};
