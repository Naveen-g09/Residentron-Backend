const express = require('express');
const bodyParser = require('body-parser');
import pg from 'pg';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'Residentron',
  password: 'root',
  port: 5432,
});

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err.stack));

  app.get('/api/v1/residents', (req, res) => {
    db.query('SELECT * FROM residents', (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
  );

  app.get('/api/v1/residents/:id', (req, res) => {
    const id = parseInt(req.params.id);
  
    db.query('SELECT * FROM residents WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    });
  }
  );

  app.post('/api/v1/residents', (req, res) => {
    const { name, email } = req.body;
  
    db.query('INSERT INTO residents (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error;
      }
      res.status(201).send(`Resident added with ID: ${results.insertId}`);
    });
  }
  );
  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
