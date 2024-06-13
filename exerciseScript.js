$(document).ready(function() {
    // Function to fetch videos based on the query
    function fetchVideos(query) {
      $.get('http://localhost:3000/youtube', {
        q: query
      }, function(data) {
        console.log('Received data from YouTube API:', data);
  
        $('#exercises').empty();
  
        $.each(data.items, function(i, item) {
          var videoId = item.id.videoId;
          var title = item.snippet.title;
          var description = item.snippet.description;
  
          $('#exercises').append('<h3>' + title + '</h3><p>' + description + '</p><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
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
  
      var workoutType = $('#workout-type').val();
      var bodyPart = $('#body-part').val();
      var difficultyLevel = $('#difficulty-level').val();
      var duration = $('#duration').val();
      var equipmentNeeded = $('#equipment-needed').val();
  
      var query = workoutType + ' ' + bodyPart + ' ' + difficultyLevel + ' ' + duration + ' ' + equipmentNeeded;
  
      console.log('Filter form submitted with query:', query);
  
      // Fetch videos based on the filter form
      fetchVideos(query);
    });
  
    // Event listener for the workout form
    $('#workout-form').on('submit', function(e) {
      e.preventDefault();
  
      var fitnessGoals = $('#fitnessGoals').val();
      var dietGoals = $('#dietGoals').val();
      var mealType = $('#mealType').val();
      var caloriesRange = $('#caloriesRange').val();
  
      var query = fitnessGoals + ' ' + dietGoals + ' ' + mealType + ' ' + caloriesRange;
  
      // Store the query in localStorage
      localStorage.setItem('query', query);
  
      // Redirect to the Exercise.html page
      window.location.href = 'Exercise.html';
    });
  });