import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connection from './Database/db.js';
import router from './Routes/route.js';

// Load environment variables
dotenv.config();
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const app = express();


app.use(cors()); // Allow cross-origin requests

// Body-parser middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
app.use('/', router);

// Database connection
connection(USERNAME, PASSWORD);


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT} ✅`);
});
