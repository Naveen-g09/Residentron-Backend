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
