const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const app = express();
app.use(cors()); // Use cors middleware
const port = 3000;


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/youtube', async (req, res) => {
  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        maxResults: 4,
        q: 'recipes fitness' + (typeof req.query.q === 'string' && req.query.q.trim() !== '' ? ' ' + req.query.q : ''),       
        type: 'video',
    key: process.env.YOUTUBE_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error making YouTube API request:', error.message);
    if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
    }
    res.status(500).send('Error making YouTube API request');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});