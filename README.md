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

### Installing

1. Clone the repository:

    ```bash
    git clone https://github.com/Naveen-g09/Residentron-Backend.git
    cd Residentron-Backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. [Additional steps, if any]

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

### DB DESIGN

---

```mermaid
erDiagram
  AUTH ||--o{ PROFILE : has
  PROFILE ||--o{ TRANSACTION : has
  PROFILE ||--o{ UTILITY : has
  PROFILE ||--o{ AMENITIES : has
  PROFILE ||--o{ SERVICES : has
  PROFILE ||--o{ REPAIR : has
  PROFILE ||--o{ VISITORS : has
  PROFILE ||--o{ EVENTS : has
  AUTH {
    int id PK "primary, auto increment"
    string username
    string password "encrypted"
    string email
  }
  PROFILE {
    int id PK "primary, auto increment"
    string name
    string email
    string password "encrypted"
    string phoneNumber
    datetime createdAt
    datetime updatedAt
  }
  TRANSACTION {
    int profile_id FK
    string transaction_id
    float amount
    datetime createdDate
  }
  UTILITY {
    int profile_id FK
    string utility_id
    date usedDate
    string name
    datetime createdAt
    datetime updatedAt
  }
  AMENITIES {
    int profile_id FK
    string amenityName
    date bookingDate
    time time
    datetime createdAt
    datetime editedAt
  }
  SERVICES {
    int profile_id FK
    string serviceId
    string serviceName
    string serviceMan
    boolean subscription
    datetime createdAt
    datetime updatedAt
    datetime cancelledAt
  }
  REPAIR {
    int profile_id FK
    string applianceToRepair
    string repairPerson
    datetime createdAt
    datetime cancelledAt
  }
  VISITORS {
    int profile_id FK
    string visitorName
    string visitorContact
    time visitorInTime
    time visitorOutTime
    string visitorVehicle
    datetime createTime
    datetime updateTime
  }
  EVENTS {
    int profile_id FK
    datetime createdAt
    string eventName
    datetime eventDateTime
    string eventType
    datetime updatedAt
  }
```

---

## APIS

---

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
  - GET (by profileId): https://96b5-103-136-175-206

.ngrok-free.app/repair/:profileId
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
```

Replace `residentron/` with the actual URL where your backend server is hosted.
In the place of residentron use this url: https://96b5-103-136-175-206.ngrok-free.app

