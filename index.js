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


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
