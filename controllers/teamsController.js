const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// In-memory storage for the Active Directory link
let activeDirectoryLink = null;

// Endpoint to set the Active Directory link
router.post('/set-ad-link', (req, res) => {
    const { link } = req.body;

    if (!link || !/^https:\/\/login\.microsoftonline\.com\/.+$/.test(link)) {
        return res.status(400).json({ error: 'Invalid Active Directory link' });
    }

    activeDirectoryLink = link;
    res.json({ message: 'Active Directory link set successfully' });
});

// Endpoint to fetch and process Teams data
router.get('/teams-data', async (req, res) => {
    if (!activeDirectoryLink) {
        return res.status(400).json({ error: 'Active Directory link is not set' });
    }

    try {
        // Fetch data from the Active Directory API
        const response = await fetch(`${activeDirectoryLink}/teams-data`);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const teamsData = await response.json();

        // Process the data (example: filter and map it)
        const processedData = teamsData.map(team => ({
            id: team.id,
            name: team.displayName,
            description: team.description || 'No description available'
        }));

        res.json(processedData);
    } catch (error) {
        console.error('Error fetching Teams data:', error);
        res.status(500).json({ error: 'Failed to fetch Teams data' });
    }
});

module.exports = router;