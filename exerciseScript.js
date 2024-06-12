// Get the input values from localStorage
const fitnessGoals = localStorage.getItem('fitnessGoals');
const dietGoals = localStorage.getItem('dietGoals');
const mealType = localStorage.getItem('mealType');
const caloriesRange = localStorage.getItem('caloriesRange');

// Fetch the exercises from the ExerciseDB API
$.get('https://wger.de/api/v2/exercise/?language=2&limit=10&muscles=' + fitnessGoals, function(data) {
  // Clear the exercises div
  $('#exercises').empty();

  // Loop through the exercises in the response
  for (let exercise of data.results) {
    // Create a new div for the exercise
    let exerciseDiv = $('<div>').addClass('exercise');

    // Add the exercise name and description to the div
    exerciseDiv.append($('<h2>').text(exercise.name));
    exerciseDiv.append($('<p>').html(exercise.description));

    // Add a video and play button if the exercise has a video
    if (exercise.video_url) {
      let video = $('<video>').attr('src', exercise.video_url).attr('id', 'video' + exercise.id);
      let button = $('<button>').text('Play').on('click', function() {
        video.get(0).play();
      });

      exerciseDiv.append(video);
      exerciseDiv.append(button);
    }

    // Append the exercise div to the exercises div
    $('#exercises').append(exerciseDiv);
  }
});