const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const qs = require('querystring');

// Replace these with your actual values
const CLIENT_ID = 'YOUR_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
const TENANT_ID = 'YOUR_TENANT_ID';

// Endpoint to fetch and process Teams data
router.get('/teams-data', async (req, res) => {
    try {
        // Step 1: Get an access token
        const tokenResponse = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: qs.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                scope: 'https://graph.microsoft.com/.default',
                grant_type: 'client_credentials',
            }),
        });

        if (!tokenResponse.ok) {
            throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
        }

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        // Step 2: Fetch data from Microsoft Graph API
        const graphResponse = await fetch('https://graph.microsoft.com/v1.0/users', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (!graphResponse.ok) {
            throw new Error(`Failed to fetch data: ${graphResponse.statusText}`);
        }

        const graphData = await graphResponse.json();

        // Step 3: Process the data (example: map user data)
        const processedData = graphData.value.map(user => ({
            id: user.id,
            displayName: user.displayName,
            email: user.mail || 'No email available',
        }));

        res.json(processedData);
    } catch (error) {
        console.error('Error fetching Teams data:', error);
        res.status(500).json({ error: 'Failed to fetch Teams data' });
    }
});

// Endpoint to fetch a specific user directory
router.get('/userdirectories/:id', async (req, res) => {
    const userDirectoryId = req.params.id;

    try {
        const haiiloApiUrl = `https://your-haiilo-instance.com/api/userdirectories/${userDirectoryId}`;
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