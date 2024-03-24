# First Look at API management

Express API for managing hotel rooms.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository

2. Install dependencies: npm install

3. Set up MongoDB:
   - Install MongoDB locally or use a cloud-based MongoDB service.
   - Update the MongoDB connection string in `app.js` file to point to your MongoDB instance.

## Usage

Start the server:

- npm run start

- In order to view this code base please refer to the master branch, I had problems pushing this to the main branch.

- To test the APIs using postman, set the URL value for the POST requests for room to be http://localhost:3838/api/v1/home/rooms

- To test the roomType APIs, set the URL value to be http://localhost:3838/api/v1/home/room-type. This applies for both GET and POST requests.

- To send values in the request body, use the raw option and have it set to JSON. The object being sent should be of the format
  `{
  "name": "anotherONe",
  "roomType": "anything",
  "price": 100
}`





