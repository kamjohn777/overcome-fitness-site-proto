const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Use cors middleware
const port = 3000;

app.get('/youtube', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 4,
        q: req.query.q,
        type: 'video',
        key: process.env.YOUTUBE_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making YouTube API request:', error);
    res.status(500).send('Error making YouTube API request');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});