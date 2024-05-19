// varsha_b.js

const db = require('../db');

// Create (INSERT)
async function createVarshaB(roomNumber, name, ownershipType, parking) {
    const query = 'INSERT INTO varsha_b_wing (room_number, name, ownership_type, parking) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [roomNumber, name, ownershipType, parking];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Read (SELECT)
async function getVarshaBById(id) {
    const query = 'SELECT * FROM varsha_b_wing WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
}

async function getVarshaBByRoomNumber(roomNumber) {
    const query = 'SELECT * FROM varsha_b_wing WHERE room_number = $1';
    const { rows } = await db.query(query, [roomNumber]);
    return rows;
}

async function getVarshaBByName(name) {
    const query = 'SELECT * FROM varsha_b_wing WHERE name = $1';
    const { rows } = await db.query(query, [name]);
    return rows;
}

async function getVarshaBByOwnershipType(ownershipType) {
    const query = 'SELECT * FROM varsha_b_wing WHERE ownership_type = $1';
    const { rows } = await db.query(query, [ownershipType]);
    return rows;
}

async function getAllVarshaB() {
    const query = 'SELECT * FROM varsha_b_wing';
    const { rows } = await db.query(query);
    return rows;
}

// Update (UPDATE)
async function updateVarshaB(id, roomNumber, name, ownershipType, parking) {
    const query = 'UPDATE varsha_b_wing SET room_number = $1, name = $2, ownership_type = $3, parking = $4 WHERE id = $5 RETURNING *';
    const values = [roomNumber, name, ownershipType, parking, id];
    const { rows } = await db.query(query, values);
    return rows[0];
}

// Delete (DELETE)
async function deleteVarshaB(id) {
    const query = 'DELETE FROM varsha_b_wing WHERE id = $1';
    await db.query(query, [id]);
}

module.exports = { createVarshaB, getVarshaBById, getVarshaBByRoomNumber, getVarshaBByName, getVarshaBByOwnershipType, getAllVarshaB, updateVarshaB, deleteVarshaB };
