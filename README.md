# overcome-fitness-site-proto

### Project Overview

**Purpose:**
Overcome Fitness is a comprehensive fitness web application designed to help users achieve their fitness goals. The app provides users with information about the business's mission and values, offers personalized workout recommendations based on user input, and features a Body Mass Index (BMI) calculator. Currently, the app leverages YouTube's API to pull workout and recipe videos tailored to users' fitness needs, with plans to integrate proprietary workout data in the future.

### STAR Interview Questions

**Situation:**
Overcome Fitness was developed to provide users with a personalized fitness experience. The app focuses on delivering valuable content and tools to help users stay motivated and informed about their fitness journey.

**Task:**
The initial task involved creating a user-friendly interface that effectively communicates the business's mission and values. This included implementing forms for users to input their fitness goals, filtering workout recommendations based on those inputs, and integrating BMI calculations. Additionally, the app was designed to fetch workout and recipe videos from YouTube's API to provide a diverse range of fitness content.

**Action:**
Overcome Fitness was developed under a personal GitHub repository. The project was structured to ensure a clear separation of frontend and backend functionalities, allowing for efficient development and deployment. The frontend was built using HTML, CSS, JavaScript, and jQuery. The backend was implemented with Node.js and Express.js to handle API calls and data processing. Swiper and ScrollReveal were used for enhanced UI interactions and animations.

**Result:**
The app successfully delivers a rich user experience with a clean UI and responsive design. Users can input their fitness goals, receive tailored workout and recipe video recommendations, and calculate their BMI. The integration with YouTube's API allows for a wide variety of fitness content, enhancing the app's value to users. Future updates will include proprietary workout data specific to Overcome Fitness, further enhancing the personalized experience.

### Technologies Used

- **Frontend:** HTML, CSS, JavaScript, jQuery, Swiper, ScrollReveal
- **Backend:** Node.js, Express.js
- **API Integration:** YouTube API for fetching workout and recipe videos
- **Other:** RESTful API design, BMI calculator

### Job Function Competencies

**JF 2.4: Demonstrates commitment to continued professional development**
Throughout the development of Overcome Fitness, I demonstrated a strong commitment to continuous professional development. Building this project independently allowed me to enhance and refine my skills in web development and frontend design. I invested time in mastering the integration of YouTube's API and implementing a robust BMI calculator, which involved persistent learning and experimentation.

**JF 3.3: Understands how to develop effective user interfaces**
In developing the user interface (UI) for Overcome Fitness, I prioritized creating an intuitive and visually appealing experience for users. Leveraging HTML, CSS, JavaScript, and jQuery, I designed a clean and responsive UI that effectively communicates the business's mission and values. The UI includes forms for user input, dynamic filtering of workout recommendations, and video content integration, ensuring a seamless and enjoyable user experience.

**JF 3.5: Understands how to follow software designs and functional/technical specifications**
The development of Overcome Fitness adhered to clear software design and functional/technical specifications. The project began with a detailed outline of features, including user input forms, BMI calculation, and YouTube API integration for video content. Each feature was meticulously planned and implemented to meet these specifications, ensuring a cohesive and functional application.

**JF 4.7: Understands how to apply algorithms, logic, and data structures**
While Overcome Fitness primarily focused on frontend development using HTML, CSS, JavaScript, and jQuery, understanding algorithms, logic, and data structures was crucial for implementing efficient solutions. This included managing user sessions, handling form submissions, and integrating real-time data with Node.js and Express.js. By applying logical structures and algorithms, the application operates smoothly and meets user expectations.

---
![Overcome Fitness](./assets/overcome-homepage.png)
![Overcome Fitness](./assets/overcome-fitness-recipes.png)
![Overcome Fitness mobile](./assets/overcome-fitness-mobile-screencapture.png)



### Code Explanation

Below is a detailed explanation of the `server.js` file, which serves as the backend for the Overcome Fitness application, and the `RecipesScript.js` file, which handles frontend interactions and communication with the backend:

#### server.js

```javascript
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
```

**Code Explanation:**

1. **Setup and Configuration:**
    ```javascript
    const express = require('express');
    const axios = require('axios');
    const cors = require('cors');
    const path = require('path');
    require('dotenv').config();
    ```
    - The code begins by requiring necessary modules: `express` for setting up the server, `axios` for making HTTP requests, `cors` for enabling Cross-Origin Resource Sharing, and `path` for handling file paths. `dotenv` is used to load environment variables from a `.env` file.

2. **Initialize Express App:**
    ```javascript
    const app = express();
    app.use(cors()); // Use cors middleware
    const port = 3000;
    ```
    - An instance of an Express app is created and CORS middleware is used to allow cross-origin requests. The server is set to listen on port 3000.

3. **Serve Static Files:**
    ```javascript
    app.use(express.static(path.join(__dirname, 'public')));
    ```
    - The app is configured to serve static files from the "public" directory.

4. **YouTube API Endpoint:**
    ```javascript
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
    ```
    - This route handles GET requests to the `/youtube` endpoint. It uses `axios` to make a request to the YouTube API, searching for videos related to "recipes fitness". If a query parameter is provided, it appends it to the search term. The response data from YouTube API is sent back as JSON. In case of an error, appropriate error messages are logged and a 500 status response is sent.

5. **Start the Server:**
    ```javascript
    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
    ```
    - The server is started and listens on the specified port (3000). A message is logged to indicate that the server is running.

#### RecipesScript.js

```javascript
$(document).ready(function() {
    // Function to fetch videos based on the query
    function fetchVideos(query) {
      $.get('http://localhost:3000/youtube', {
        q: query
      }, function(data) {
        console.log('Received data from YouTube API:', data);
  
        $('#recipes').empty();
  
        $.each(data.items, function(i, item) {
          var videoId = item.id.videoId;
          var title = item.snippet.title;
          var description = item.snippet.description;
  
          $('#recipes').append('<div class="video-content-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h3>' + title + '</h3><p>' + description + '</p></div>');
        });
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error making YouTube API request:', textStatus, errorThrown);
      });
    }
  
    // Fetch videos based on the query stored in localStorage
    var query = localStorage.getItem('query');
    if (query) {
      fetchVideos(query);
    }
  
    // Event listener for the filter form
    $('#filter-form').on('submit', function(e) {
      e.preventDefault();
  
      var recipeType

 = $('#recipe-type').val();
      var mainIngredient = $('#main-ingredient').val();
      var difficultyLevel = $('#difficulty-level').val();
      var prepTime = $('#prep-time').val();
      var dietaryPreferences = $('#dietary-preferences').val();
  
      var query = recipeType + ' ' + mainIngredient + ' ' + difficultyLevel + ' ' + prepTime + ' ' + dietaryPreferences;
  
      console.log('Filter form submitted with query:', query);
  
      // Fetch videos based on the filter form
      fetchVideos(query);
    });
  
    // Event listener for the recipe form
    $('#recipe-form').on('submit', function(e) {
      e.preventDefault();
  
      var mealType = $('#mealType').val();
      var dietGoals = $('#dietGoals').val();
      var caloriesRange = $('#caloriesRange').val();
  
      var query = mealType + ' ' + dietGoals + ' ' + caloriesRange;
  
      // Store the query in localStorage
      localStorage.setItem('query', query);
  
      // Redirect to the Recipes.html page
      window.location.href = 'Recipes.html';
    });
});
```

**Code Explanation:**

1. **Document Ready Function:**
    ```javascript
    $(document).ready(function() {
    ```
    - Ensures that the code inside is executed once the DOM is fully loaded.

2. **fetchVideos Function:**
    ```javascript
    function fetchVideos(query) {
      $.get('http://localhost:3000/youtube', {
        q: query
      }, function(data) {
        console.log('Received data from YouTube API:', data);
  
        $('#recipes').empty();
  
        $.each(data.items, function(i, item) {
          var videoId = item.id.videoId;
          var title = item.snippet.title;
          var description = item.snippet.description;
  
          $('#recipes').append('<div class="video-content-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h3>' + title + '</h3><p>' + description + '</p></div>');
        });
      }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('Error making YouTube API request:', textStatus, errorThrown);
      });
    }});
    ```
    - This function takes a query parameter, makes an AJAX GET request to the backend server at `http://localhost:3000/youtube` with the query, and processes the response data to display the videos on the page.

3. **Fetch Videos Based on Query Stored in localStorage:**
    ```javascript
    var query = localStorage.getItem('query');
    if (query) {
      fetchVideos(query);
    }
    ```
    - Retrieves the query from localStorage and fetches videos if the query exists.

4. **Event Listener for the Filter Form:**
    ```javascript
    $('#filter-form').on('submit', function(e) {
      e.preventDefault();
  
      var recipeType = $('#recipe-type').val();
      var mainIngredient = $('#main-ingredient').val();
      var difficultyLevel = $('#difficulty-level').val();
      var prepTime = $('#prep-time').val();
      var dietaryPreferences = $('#dietary-preferences').val();
  
      var query = recipeType + ' ' + mainIngredient + ' ' + difficultyLevel + ' ' + prepTime + ' ' + dietaryPreferences;
  
      console.log('Filter form submitted with query:', query);
  
      // Fetch videos based on the filter form
      fetchVideos(query);
    });
    ```
    - Handles the submission of the filter form, constructs a query from the form inputs, and fetches videos based on the query.

5. **Event Listener for the Recipe Form:**
    ```javascript
    $('#recipe-form').on('submit', function(e) {
      e.preventDefault();
  
      var mealType = $('#mealType').val();
      var dietGoals = $('#dietGoals').val();
      var caloriesRange = $('#caloriesRange').val();
  
      var query = mealType + ' ' + dietGoals + ' ' + caloriesRange;
  
      // Store the query in localStorage
      localStorage.setItem('query', query);
  
      // Redirect to the Recipes.html page
      window.location.href = 'Recipes.html';
    });
    ```
    - Handles the submission of the recipe form, constructs a query from the form inputs, stores the query in localStorage, and redirects to the `Recipes.html` page.

