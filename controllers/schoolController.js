const db = require('../config/db');

// Utility function to calculate distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
              
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; // Distance in kilometers
};

const addSchool = async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body || {};

        // Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Valid name is required' });
        }
        if (!address || typeof address !== 'string' || address.trim() === '') {
            return res.status(400).json({ error: 'Valid address is required' });
        }
        if (latitude === undefined || typeof latitude !== 'number' || isNaN(latitude)) {
            return res.status(400).json({ error: 'Valid latitude is required' });
        }
        if (longitude === undefined || typeof longitude !== 'number' || isNaN(longitude)) {
            return res.status(400).json({ error: 'Valid longitude is required' });
        }

        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [name, address, latitude, longitude]);

        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const listSchools = async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        // Validation
        if (!latitude || !longitude) {
            return res.status(400).json({ error: 'Latitude and longitude are required parameters' });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (isNaN(userLat) || isNaN(userLon)) {
            return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
        }

        const [schools] = await db.query('SELECT * FROM schools');

        // Calculate distance and add to school objects
        const schoolsWithDistance = schools.map(school => {
            const distance = calculateDistance(userLat, userLon, school.latitude, school.longitude);
            return { ...school, distance };
        });

        // Sort by distance (ascending)
        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.status(200).json(schoolsWithDistance);
    } catch (error) {
        console.error('Error listing schools:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    addSchool,
    listSchools
};
