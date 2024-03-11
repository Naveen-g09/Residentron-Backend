const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// app.js
mongoose.connect('mongodb://localhost:27017/residentron', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userRoutes = require('./routes/User');

app.use('/users', userRoutes);

//TODO: Create a post and fetch route


app.get('/', (req, res) => {
  try {
    res.json({ message: 'Welcome to Residentron' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
