# Residentron-Backend

This is the backend for the Residentron project, an integrated housing society app for managing users and community-related activities.

## Features

-
- ...

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

### Tech Stack(Probably)
1. Postgres
2. Express
3. DAPR
4. OPENAI
5. Docker
6. AWS

### DB DESIGN

---

![image](https://github.com/Naveen-g09/Residentron-Backend/assets/76151123/688061b0-e828-492a-bc08-ff0e62241f0c)

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

![image](https://github.com/Naveen-g09/Residentron-Backend/assets/76151123/688061b0-e828-492a-bc08-ff0e62241f0c)
