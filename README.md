# School Management APIs

A Node.js and Express based REST API for managing school data and retrieving schools sorted by geographical proximity to a user's location.

## Technologies Used
- Node.js
- Express.js
- MySQL
- `mysql2` (Promise-based MySQL driver)
- `dotenv` (Environment variable management)

## Features
1. **Add School**: Add a new school with its geographical coordinates (latitude and longitude).
2. **List Schools**: Retrieve all schools sorted by their distance from a specified user location (using the Haversine formula).
3. **Auto Database Setup**: The application automatically creates the required database (`backend`) and `schools` table on startup if they don't already exist.

## Prerequisites
- **Node.js** installed on your machine.
- **MySQL Server** installed and running on `localhost`.

## Setup & Installation

1. Clone or download this project.
2. Navigate to the project directory in your terminal:
   ```bash
   cd path/to/project
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Verify your MySQL configuration in the `.env` file (it defaults to `root` user with no password and creates a database named `backend`).

## Running the Application

To start the server, run:
```bash
node index.js
```
The server will start on port `3000` (or the port defined in `.env`). Upon running, it will automatically connect to MySQL and ensure the `schools` table is ready.

## API Documentation

### 1. Add School
Adds a new school to the database.

- **URL:** `/addSchool`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`
- **Request Body (JSON):**
  ```json
  {
      "name": "Delhi Public School",
      "address": "Pitampura, New Delhi",
      "latitude": 28.6989,
      "longitude": 77.1384
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
      "message": "School added successfully",
      "schoolId": 1
  }
  ```
- **Error Response:** `400 Bad Request` (If validation fails)
  ```json
  {
      "error": "Valid name is required"
  }
  ```

### 2. List Schools
Fetches all schools, sorted by distance from the user's provided coordinates.

- **URL:** `/listSchools`
- **Method:** `GET`
- **Query Parameters:**
  - `latitude` (Float): The user's current latitude.
  - `longitude` (Float): The user's current longitude.
  - *Example:* `/listSchools?latitude=28.7041&longitude=77.1025`
- **Success Response:** `200 OK`
  ```json
  [
      {
          "id": 1,
          "name": "Delhi Public School",
          "address": "Pitampura, New Delhi",
          "latitude": 28.6989,
          "longitude": 77.1384,
          "distance": 3.542
      }
  ]
  ```
  *(Note: `distance` is calculated in kilometers).*

## Testing with Postman
A Postman collection (`School_Management_APIs.postman_collection.json`) is included in the project directory. 
1. Open Postman.
2. Click **Import** and select the `.json` file.
3. You will have pre-configured templates for testing both APIs easily.
