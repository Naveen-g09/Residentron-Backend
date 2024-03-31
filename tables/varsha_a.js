// varsha_a.js

const db = require('../db');

// Create (INSERT)
async function createVarshaA(roomNumber, name, ownershipType, parking) {
    const query = 'INSERT INTO varsha_a_wing (room_number, name, ownership_type, parking) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [roomNumber, name, ownershipType, parking];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read (SELECT)
async function getVarshaAById(id) {
    const query = 'SELECT * FROM varsha_a_wing WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
}

// Update (UPDATE)
async function updateVarshaA(id, roomNumber, name, ownershipType, parking) {
    const query = 'UPDATE varsha_a_wing SET room_number = $1, name = $2, ownership_type = $3, parking = $4 WHERE id = $5 RETURNING *';
    const values = [roomNumber, name, ownershipType, parking, id];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete (DELETE)
async function deleteVarshaA(id) {
    const query = 'DELETE FROM varsha_a_wing WHERE id = $1';
    await db.query(query, [id]);
}


async function getAllVarshaA() {
    const query = 'SELECT * FROM varsha_a_wing';
    const { rows } = await db.query(query);
    return rows;
}

async function getVarshaAByRoomNumber(roomNumber) {
    const query = 'SELECT * FROM varsha_a_wing WHERE room_number = $1';
    const { rows } = await db.query(query, [roomNumber]);
    return rows[0];
}

async function getVarshaAByOwnerName(name) {
    const query = 'SELECT * FROM varsha_a_wing WHERE name = $1';
    const { rows } = await db.query(query, [name]);
    return rows[0];
}

async function getVarshaAByOwnershipType(ownershipType) {
    const query = 'SELECT * FROM varsha_a_wing WHERE ownership_type = $1';
    const { rows } = await db.query(query, [ownershipType]);
    return rows;
}

async function getVarshaAByParking(parking) {
    const query = 'SELECT * FROM varsha_a_wing WHERE parking = $1';
    const { rows } = await db.query(query, [parking]);
    return rows;

}


module.exports = { createVarshaA, getVarshaAById, updateVarshaA, deleteVarshaA, getAllVarshaA, getVarshaAByRoomNumber, getVarshaAByOwnerName, getVarshaAByOwnershipType, getVarshaAByParking};
