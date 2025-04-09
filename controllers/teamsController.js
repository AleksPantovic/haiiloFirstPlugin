const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// Endpoint to fetch all user directories
router.get('/userdirectories', async (req, res) => {
    try {
        const haiiloApiUrl = `https://asioso.coyocloud.com/api/userdirectories`;
        const response = await fetch(haiiloApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Replace with your Haiilo API token
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user directories: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching user directories:', error);
        res.status(500).json({ error: 'Failed to fetch user directories' });
    }
});

// Endpoint to fetch a specific user directory
router.get('/userdirectories/:id', async (req, res) => {
    const userDirectoryId = req.params.id;

    try {
        const haiiloApiUrl = `https://asioso.coyocloud.com/api/userdirectories/${userDirectoryId}`;
        const response = await fetch(haiiloApiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Replace with your Haiilo API token
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user directory: ${response.statusText}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching user directory:', error);
        res.status(500).json({ error: 'Failed to fetch user directory' });
    }
});

module.exports = router;