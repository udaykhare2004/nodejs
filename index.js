const express = require('express');
const dotenv = require('dotenv');
const schoolRoutes = require('./routes/schoolRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Default to application/json if Content-Type is missing
app.use((req, res, next) => {
    if (!req.headers['content-type']) {
        req.headers['content-type'] = 'application/json';
    }
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route for health check / browser visit
app.get('/', (req, res) => {
    res.send('Welcome to the School Management API! Use /addSchool (POST) or /listSchools (GET).');
});

// Routes
app.use('/', schoolRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
