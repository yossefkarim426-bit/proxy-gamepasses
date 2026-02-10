const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    const { q } = req.query;

    if (!q) {
        return res.status(400).json({ error: "No URL provided. Use ?q=URL" });
    }

    try {
        const targetUrl = decodeURIComponent(q);
        console.log(`Proxying: ${targetUrl}`);

        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'application/json'
            }
        });

        res.json(response.data);

    } catch (error) {
        res.status(500).json({
            error: "Proxy Error",
            message: error.message,
            roblox_response: error.response ? error.response.data : null
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});