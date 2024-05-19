const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const cors = require('cors'); // Corrected import

const app = express();
const port = process.env.PORT || 5500;
const auth = require('./tables/auth');
const profile = require('./tables/profile');
const transaction = require('./tables/transaction');
const utility = require('./tables/utility');
const amenity = require('./tables/amenity');
const service = require('./tables/service');
const repair = require('./tables/repair');
const visitor = require('./tables/visitor');
const events = require('./tables/events');
app.use(bodyParser.json());
app.use(cors()); // Added CORS middleware

const db = require('./db');

db.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Error connecting to the database', err.stack));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.get('/', (req, res) => {
  res.send('Welcome to Residentron API');
}
);

// Auth
app.post('/auth', async (req, res) => {
  const { username, password, email } = req.body;
  const user = await auth.createUser(username, password, email);
  res.json(user);
});

app.get('/auth/:username', async (req, res) => {
  const { username } = req.params;
  const user = await auth.getUserByUsername(username);
  res.json(user);
}
);

app.get('/auth/email/:email', async (req, res) => {
  const { email } = req.params;
  const user = await auth.getUserByEmail(email);
  res.json(user);
}
);

app.put('/auth/:username', async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  const user = await auth.updateUserPassword(username, password);
  res.json(user);
}
);

app.delete('/auth/:username', async (req, res) => {
  const { username } = req.params;
  await auth.deleteUser(username);
  res.json({ message: 'User deleted successfully' });
}
);

// Profile
app.post('/profile', async (req, res) => {
  const { name, email, password, phoneNumber } = req.body;
  const user = await profile.createProfile(name, email, password, phoneNumber);
  res.json(user);
});

app.get('/profile/:email', async (req, res) => {
  const { email } = req.params;
  const user = await profile.getProfileByEmail(email);
  res.json(user);
}
);

app.get('/profile/id/:id', async (req, res) => {
  const { id } = req.params;
  const user = await profile.getProfileById(id);
  res.json(user);
}
);

app.put('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password, phoneNumber } = req.body;
  const user = await profile.updateProfile(id, { name, email, password, phoneNumber });
  res.json(user);
}
);

app.delete('/profile/:id', async (req, res) => {
  const { id } = req.params;
  await profile.deleteProfile(id);
  res.json({ message: 'Profile deleted successfully' });
}
);

// Transaction
app.post('/transaction', async (req, res) => {
  const { profileId, amount, type } = req.body;
  const transaction = await transaction.createTransaction(profileId, amount, type);
  res.json(transaction);
});

app.get('/transaction/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const transactions = await transaction.getTransactionsByProfileId(profileId);
  res.json(transactions);
}
);

app.put('/transaction/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  const { amount } = req.body;
  const transaction = await transaction.updateTransactionAmount(transactionId, amount);
  res.json(transaction);
}
);

app.delete('/transaction/:transactionId', async (req, res) => {
  const { transactionId } = req.params;
  await transaction.deleteTransaction(transactionId);
  res.json({ message: 'Transaction deleted successfully' });
}
);

// Utility
app.post('/utility', async (req, res) => {
  const { profileId, utilityId, usedDate, name } = req.body;
  const utility = await utility.createUtility(profileId, utilityId, usedDate, name);
  res.json(utility);
});

app.get('/utility/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const utilities = await utility.getUtilitiesByProfileId(profileId);
  res.json(utilities);
}
);

app.put('/utility/:utilityId', async (req, res) => {
  const { utilityId } = req.params;
  const { name, usedDate } = req.body;
  const utility = await utility.updateUtility(utilityId, { name, usedDate });
  res.json(utility);
}
);

app.delete('/utility/:utilityId', async (req, res) => {
  const { utilityId } = req.params;
  await utility.deleteUtility(utilityId);
  res.json({ message: 'Utility deleted successfully' });
}
);

// Amenity
app.post('/amenity', async (req, res) => {
  const { profileId, amenityId, name, usedDate } = req.body;
  const amenity = await amenity.createAmenity(profileId, amenityId, name, usedDate);
  res.json(amenity);
});

app.get('/amenity/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const amenities = await amenity.getAmenitiesByProfileId(profileId);
  res.json(amenities);
}
);

app.put('/amenity/:amenityId', async (req, res) => {
  const { amenityId } = req.params;
  const { name, usedDate } = req.body;
  const amenity = await amenity.updateAmenity(amenityId, { name, usedDate });
  res.json(amenity);
}
);

app.delete('/amenity/:amenityId', async (req, res) => {
  const { amenityId } = req.params;
  await amenity.deleteAmenity(amenityId);
  res.json({ message: 'Amenity deleted successfully' });
}
);

// Service
app.post('/service', async (req, res) => {
  const { profileId, serviceId, serviceName, serviceMan, subscription } = req.body;
  const service = await service.createService(profileId, serviceId, serviceName, serviceMan, subscription);
  res.json(service);
});

app.get('/service/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const services = await service.getServicesByProfileId(profileId);
  res.json(services);
}
);

app.put('/service/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  const { serviceName, serviceMan, subscription } = req.body;
  const service = await service.updateService(serviceId, { serviceName, serviceMan, subscription });
  res.json(service);
}
);

app.delete('/service/:serviceId', async (req, res) => {
  const { serviceId } = req.params;
  await service.deleteService(serviceId);
  res.json({ message: 'Service deleted successfully' });
}
);

// Repair
app.post('/repair', async (req, res) => {
  const { profileId, applianceName, repairPerson } = req.body;
  const repair = await repair.createRepair(profileId, applianceName, repairPerson);
  res.json(repair);
});

app.get('/repair/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const repairs = await repair.getRepairsByProfileId(profileId);
  res.json(repairs);
}
);

app.put('/repair/:repairId', async (req, res) => {
  const { repairId } = req.params;
  const { applianceName, repairPerson } = req.body;
  const repair = await repair.updateRepair(repairId, { applianceName, repairPerson });
  res.json(repair);
}
);

app.delete('/repair/:repairId', async (req, res) => {
  const { repairId } = req.params;
  await repair.deleteRepair(repairId);
  res.json({ message: 'Repair deleted successfully' });
}
);

// Visitor
app.post('/visitor', async (req, res) => {
  const { profileId, visitorId, name, phoneNumber, visitDate } = req.body;
  const visitor = await visitor.createVisitor(profileId, visitorId, name, phoneNumber, visitDate);
  res.json(visitor);
});

app.get('/visitor/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const visitors = await visitor.getVisitorsByProfileId(profileId);
  res.json(visitors);
}
);


app.put('/visitor/:visitorId', async (req, res) => {
  const { visitorId } = req.params;
  const { name, phoneNumber, visitDate } = req.body;
  const visitor = await visitor.updateVisitor(visitorId, { name, phoneNumber, visitDate });
  res.json(visitor);
}
);

app.delete('/visitor/:visitorId', async (req, res) => {
  const { visitorId } = req.params;
  await visitor.deleteVisitor(visitorId);
  res.json({ message: 'Visitor deleted successfully' });
}
);

// Events

app.post('/events', async (req, res) => {
  const { profileId, eventName, eventDateTime, eventType } = req.body;
  const event = await events.createEvent(profileId, eventName, eventDateTime, eventType);
  res.json(event);
}
);

app.get('/events/:profileId', async (req, res) => {
  const { profileId } = req.params;
  const events = await events.getEventsByProfileId(profileId);
  res.json(events);
}
);

app.put('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const { eventName, eventDateTime, eventType } = req.body;
  const event = await events.updateEvent(eventId, { eventName, eventDateTime, eventType });
  res.json(event);
}
);

app.delete('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  await events.deleteEvent(eventId);
  res.json({ message: 'Event deleted successfully' });
}
);

// Create
app.post('/varsha_a', async (req, res) => {
  const { roomNumber, name, ownershipType, parking } = req.body;
  const record = await varshaA.createVarshaA(roomNumber, name, ownershipType, parking);
  res.json(record);
});

// Read
app.get('/varsha_a/:id', async (req, res) => {
  const { id } = req.params;
  const record = await varshaA.getVarshaAById(id);
  res.json(record);
});

// Update
app.put('/varsha_a/:id', async (req, res) => {
  const { id } = req.params;
  const { roomNumber, name, ownershipType, parking } = req.body;
  const record = await varshaA.updateVarshaA(id, roomNumber, name, ownershipType, parking);
  res.json(record);
});

// Delete
app.delete('/varsha_a/:id', async (req, res) => {
  const { id } = req.params;
  await varshaA.deleteVarshaA(id);
  res.json({ message: 'Record deleted successfully' });
});

const varshaA = require('./tables/varsha_a'); // Corrected require statement

// Update the route to get all Varsha data
app.get('/varsha_a', async (req, res) => { // Corrected route path
  try {
    // Call the function to fetch all Varsha data
    const allVarshaData = await varshaA.getAllVarshaA(); // Corrected function name

    // Send the fetched data as a JSON response
    res.json(allVarshaData);
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching Varsha data:', error);
    res.status(500).json({ message: 'Failed to fetch Varsha data' });
  }
});

// Import varsha_b module
const varshaB = require('./tables/varsha_b');

// Create
app.post('/varsha_b', async (req, res) => {
  const { roomNumber, name, ownershipType, parking } = req.body;
  const record = await varshaB.createVarshaB(roomNumber, name, ownershipType, parking);
  res.json(record);
});

// Read
app.get('/varsha_b/:id', async (req, res) => {
  const { id } = req.params;
  const record = await varshaB.getVarshaBById(id);
  res.json(record);
});

// Get by room number
app.get('/varsha_b/roomNumber/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const records = await varshaB.getVarshaBByRoomNumber(roomNumber);
  res.json(records);
});

// Get by name
app.get('/varsha_b/name/:name', async (req, res) => {
  const { name } = req.params;
  const records = await varshaB.getVarshaBByName(name);
  res.json(records);
});

// Get by ownership type
app.get('/varsha_b/ownershipType/:ownershipType', async (req, res) => {
  const { ownershipType } = req.params;
  const records = await varshaB.getVarshaBByOwnershipType(ownershipType);
  res.json(records);
});

// Get all
app.get('/varsha_b', async (req, res) => {
  try {
    const allRecords = await varshaB.getAllVarshaB();
    res.json(allRecords);
  } catch (error) {
    console.error('Error fetching varsha b data:', error);
    res.status(500).json({ message: 'Failed to fetch varsha b data' });
  }
});

const varshaCWing = require('./tables/varsha_c'); // Import varsha_c_wing module

// Create varsha_c_wing record
app.post('/varsha_c', async (req, res) => {
  const { roomNumber, name, ownershipType, parking } = req.body;
  const record = await varshaCWing.createVarshaCWing(roomNumber, name, ownershipType, parking);
  res.json(record);
});

// Read varsha_c_wing record by ID
app.get('/varsha_c/:id', async (req, res) => {
  const { id } = req.params;
  const record = await varshaCWing.getVarshaCWingById(id);
  res.json(record);
});

// Get varsha_c_wing record by room number
app.get('/varsha_c/room/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  const record = await varshaCWing.getVarshaCWingByRoomNumber(roomNumber);
  res.json(record);
});

// Get varsha_c_wing record by name
app.get('/varsha_c/name/:name', async (req, res) => {
  const { name } = req.params;
  const record = await varshaCWing.getVarshaCWingByName(name);
  res.json(record);
});

// Get varsha_c_wing record by ownership type
app.get('/varsha_c/ownership/:ownershipType', async (req, res) => {
  const { ownershipType } = req.params;
  const record = await varshaCWing.getVarshaCWingByOwnershipType(ownershipType);
  res.json(record);
});

// Get all varsha_c_wing records
app.get('/varsha_c', async (req, res) => {
  try {
    const allRecords = await varshaCWing.getAllVarshaCWing();
    res.json(allRecords);
  } catch (error) {
    console.error('Error fetching varsha_c data:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_c_wing data' });
  }
});

// Update varsha_c record
app.put('/varsha_c_wing/:id', async (req, res) => {
  const { id } = req.params;
  const { roomNumber, name, ownershipType, parking } = req.body;
  const record = await varshaCWing.updateVarshaCWing(id, roomNumber, name, ownershipType, parking);
  res.json(record);
});

// Delete varsha_c_wing record
app.delete('/varsha_c/:id', async (req, res) => {
  const { id } = req.params;
  await varshaCWing.deleteVarshaCWing(id);
  res.json({ message: 'Record deleted successfully' });
});

const varshaD = require('./tables/varsha_d');


// Create varsha_d_wing record
app.post('/varsha_d', async (req, res) => {
  const { roomNumber, name, ownershipType, parking } = req.body;
  try {
    const record = await varshaD.createVarshaDWing(roomNumber, name, ownershipType, parking);
    res.json(record);
  } catch (error) {
    console.error('Error creating varsha_d_wing record:', error);
    res.status(500).json({ message: 'Failed to create varsha_d_wing record' });
  }
});

// Read varsha_d_wing record by ID
app.get('/varsha_d/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const record = await varshaD.getVarshaDWingById(id);
    res.json(record);
  } catch (error) {
    console.error('Error fetching varsha_d_wing record by ID:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_d_wing record' });
  }
});

// Get varsha_d_wing record by room number
app.get('/varsha_d/room/:roomNumber', async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const record = await varshaD.getVarshaDWingByRoomNumber(roomNumber);
    res.json(record);
  } catch (error) {
    console.error('Error fetching varsha_d_wing record by room number:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_d_wing record' });
  }
});

// Get varsha_d_wing record by name
app.get('/varsha_d/name/:name', async (req, res) => {
  const { name } = req.params;
  try {
    const record = await varshaD.getVarshaDWingByName(name);
    res.json(record);
  } catch (error) {
    console.error('Error fetching varsha_d_wing record by name:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_d_wing record' });
  }
});

// Get varsha_d_wing record by ownership type
app.get('/varsha_d/ownership/:ownershipType', async (req, res) => {
  const { ownershipType } = req.params;
  try {
    const record = await varshaD.getVarshaDWingByOwnershipType(ownershipType);
    res.json(record);
  } catch (error) {
    console.error('Error fetching varsha_d_wing record by ownership type:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_d_wing record' });
  }
});

// Get all varsha_d_wing records
app.get('/varsha_d', async (req, res) => {
  try {
    const allRecords = await varshaD.getAllVarshaDWing();
    res.json(allRecords);
  } catch (error) {
    console.error('Error fetching all varsha_d_wing records:', error);
    res.status(500).json({ message: 'Failed to fetch varsha_d_wing records' });
  }
});

// Update varsha_d_wing record
app.put('/varsha_d/:id', async (req, res) => {
  const { id } = req.params;
  const { roomNumber, name, ownershipType, parking } = req.body;
  try {
    const record = await varshaD.updateVarshaDWing(id, roomNumber, name, ownershipType, parking);
    res.json(record);
  } catch (error) {
    console.error('Error updating varsha_d_wing record:', error);
    res.status(500).json({ message: 'Failed to update varsha_d_wing record' });
  }
});

// Delete varsha_d_wing record
app.delete('/varsha_d/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await varshaD.deleteVarshaDWing(id);
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error('Error deleting varsha_d_wing record:', error);
    res.status(500).json({ message: 'Failed to delete varsha_d_wing record' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});