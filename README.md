# HotelRestApiTask11

# Hotel Management API

This is a simple Node.js Express API for managing hotel rooms.


  [Click to run the live link on browser](https://hotelapitask10node1ucee.onrender.com/api/v1/rooms)

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository: [repo link...](https://github.com/solowiseCV/HotelApiTask11);


2. Install dependencies: npm install


3. Set up MongoDB:
   - Install MongoDB locally or use a cloud-based MongoDB service.
   - Update the MongoDB connection string in `app.js` file to point to your MongoDB instance.

## Usage

Start the server:
- npm start server.js

By default, the server runs on port 3000. You can change the port by setting the `PORT` environment variable.

## Endpoints

### POST /api/v1/rooms

Create a new room.
Request body format:

```json
{
  "name": "Room Name",
  "roomType": "roomTypeId",
  "price": 100
}

GET /api/v1/rooms
Fetch all rooms with optional filters.
Query parameters:

search: Search by room name (case-insensitive)
roomType: Filter by room type ID
minPrice: Filter by minimum price
maxPrice: Filter by maximum price
PATCH /api/v1/rooms/:roomId
Edit a room by its ID.
Request body can include any of the following fields:

name: New room name
roomType: New room type ID
price: New room price
DELETE /api/v1/rooms/:roomId
Delete a room by its ID.

GET /api/v1/rooms/:roomId
Fetch a room by its ID.

Contributing
Contributions are welcome! Please feel free to submit issues and pull requests.

