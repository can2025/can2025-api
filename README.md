# can2025 API

## Overview
The can2025 API is a RESTful API built with Node.js and Express that interacts with a MongoDB database. It provides endpoints to manage and retrieve group data for the upcoming 2025 event.

## Features
- Retrieve all groups from the MongoDB database.
- Built with TypeScript for type safety and better development experience.
- Uses Mongoose for MongoDB object modeling.

## Project Structure
```
can2025-api
├── src
│   ├── controllers        # Contains the logic for handling requests
│   │   └── groupsController.ts
│   ├── models             # Defines the data models
│   │   └── group.ts
│   ├── routes             # Defines the API routes
│   │   └── groups.ts
│   ├── app.ts             # Entry point of the application
│   └── types              # TypeScript interfaces
│       └── index.ts
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd can2025-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Ensure MongoDB is running on `localhost:27017`.

## Usage
To start the server, run:
```
npm start
```
The API will be available at `http://localhost:3000`.

## API Endpoints
- `GET /api/groups`: Retrieve all groups from the database.

## License
This project is licensed under the MIT License.