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
  
    // Event listener for the recipe form
    $('#recipe-form').on('submit', function(e) {
      e.preventDefault();
  
      var mealType = $('#mealType').val();
      var dietGoals = $('#dietGoals').val();
      var caloriesRange = $('#caloriesRange').val();
  
      var query = mealType + ' ' + dietGoals + ' ' + caloriesRange;
  
      // Store the query in mlocalStorage
      localStorage.setItem('query', query);
  
      // Redirect to the Recipes.html page
      window.location.href = 'Recipes.html';
    });
});