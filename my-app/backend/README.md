# MERN Stack Backend

This is the backend server for the MERN stack application.

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-app
```

3. Start the development server:
```bash
npm run dev
```

## Project Structure

- `src/controllers`: Contains route controllers
- `src/models`: Contains Mongoose models
- `src/routes`: Contains API routes
- `src/index.js`: Main server file

## API Endpoints

- GET `/`: Welcome message 