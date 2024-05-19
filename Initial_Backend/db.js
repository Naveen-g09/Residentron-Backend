const { Client } = require('pg');

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Residentron',
  password: 'root',
  port: 5432,
});

module.exports = db;
