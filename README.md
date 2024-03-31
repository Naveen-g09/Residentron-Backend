```markdown
# Residentron-Backend

This is the backend for the Residentron project, an integrated housing society app for managing users and community-related activities.

## Features

- User authentication (registration, login, logout)
- Profile management (create, update, delete)
- Transaction management
- Utility management
- Amenity booking
- Service subscription
- Repair service request
- Visitor management
- Event scheduling

## Getting Started

These instructions will help you set up and run the Residentron-Backend on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- yarn installed

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Naveen-g09/Residentron-Backend.git
    cd Residentron-Backend
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **[Additional steps, if any]**

### Running

Start the server:
```bash
npm start
```

### Tech Stack

1. Postgres
2. Express
3. DAPR
4. OPENAI
5. Docker
6. AWS

### Database Design

The entity-relationship diagram (ERD) is provided below:

```mermaid
erDiagram
  ... [Database schema goes here]
```

### API Endpoints

#### Residentron Endpoints

- Welcome Message: residentron/
- Authentication Endpoints:
  - POST: residentron/auth
  - GET (by username): residentron/auth/:username
  - GET (by email): residentron/auth/email/:email
  - PUT: residentron/auth/:username
  - DELETE: residentron/auth/:username
- Profile Endpoints:
  - POST: residentron/profile
  - GET (by email): residentron/profile/:email
  - GET (by id): residentron/profile/id/:id
  - PUT: residentron/profile/:id
  - DELETE: residentron/profile/:id
- Transaction Endpoints:
  - POST: residentron/transaction
  - GET (by profileId): residentron/transaction/:profileId
  - PUT: residentron/transaction/:transactionId
  - DELETE: residentron/transaction/:transactionId
- Utility Endpoints:
  - POST: residentron/utility
  - GET (by profileId): residentron/utility/:profileId
  - PUT: residentron/utility/:utilityId
  - DELETE: residentron/utility/:utilityId
- Amenity Endpoints:
  - POST: residentron/amenity
  - GET (by profileId): residentron/amenity/:profileId
  - PUT: residentron/amenity/:amenityId
  - DELETE: residentron/amenity/:amenityId
- Service Endpoints:
  - POST: residentron/service
  - GET (by profileId): residentron/service/:profileId
  - PUT: residentron/service/:serviceId
  - DELETE: residentron/service/:serviceId
- Repair Endpoints:
  - POST: residentron/repair
  - GET (by profileId): residentron/repair/:profileId
  - PUT: residentron/repair/:repairId
  - DELETE: residentron/repair/:repairId
- Visitor Endpoints:
  - POST: residentron/visitor
  - GET (by profileId): residentron/visitor/:profileId
  - PUT: residentron/visitor/:visitorId
  - DELETE: residentron/visitor/:visitorId
- Events Endpoints:
  - POST: residentron/events
  - GET (by profileId): residentron/events/:profileId
  - PUT: residentron/events/:eventId
  - DELETE: residentron/events/:eventId

#### Wing Endpoints

For each wing (A, B, C, D), the following endpoints are available:

1. **Create a Wing Record**
2. **Get Wing Record by ID**
3. **Get Wing Record by Room Number**
4. **Get Wing Record by Name**
5. **Get Wing Record by Ownership Type**
6. **Get All Wing Records**
7. **Update Wing Record**
8. **Delete Wing Record**

Endpoints for each wing are accessible under the following URLs:

- Wing A: [localhost/a](http://localhost/a)
- Wing B: [localhost/b](http://localhost/b)
- Wing C: [localhost/c](http://localhost/c)
- Wing D: [localhost/d](http://localhost/d)

### Disclaimer

Replace `localhost` in the URLs provided above with the actual secret URL provided for accessing the application.
```

