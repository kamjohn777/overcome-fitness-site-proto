$(document).ready(function () {
  // Function to fetch videos based on the query
  function fetchVideos(query) {
    // If query is empty, set a default query or display
    // if (!query.trim()) {
      // let htmlContent = $("#exercises").html();
      // return htmlContent;

      // generateDefualtContent();
      // return;
    // } 

    $.get(
      "http://localhost:3000/youtube",
      {
        q: query,
      },
      function (data) {
        console.log("Received data from YouTube API:", data);

        $("#exercises").empty();

        $.each(data.items, function (i, item) {
          var videoId = item.id.videoId;
          var title = item.snippet.title;
          var description = item.snippet.description;

          //   $('#exercises').append('<h3>' + title + '</h3><p>' + description + '</p><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
          $("#exercises").append(
            '<div class="video-content-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/' +
              videoId +
              '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h3>' +
              title +
              "</h3><p>" +
              description +
              "</p></div>"
          );
          //   $('#recipes').append('<div class="video-content-wrap"><iframe width="560" height="315" src="https://www.youtube.com/embed/' + videoId + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h3>' + title + '</h3><p>' + description + '</p></div>');
        });
      }
    ).fail(function (jqXHR, textStatus, errorThrown) {
      console.error(
        "Error making YouTube API request:",
        textStatus,
        errorThrown
      );
    });
  }

  // Fetch videos based on the query stored in localStorage
  var query = localStorage.getItem("query");
  if (query) {
    fetchVideos(query);
  } else {
    fetchVideos("workout");
  }

  // Event listener for the filter form
  $("#filter-form").on("submit", function (e) {
    e.preventDefault();

    var workoutType = $("#workout-type").val();
    var bodyPart = $("#body-part").val();
    var difficultyLevel = $("#difficulty-level").val();
    var duration = $("#duration").val();
    var equipmentNeeded = $("#equipment-needed").val();

    var query =
      workoutType +
      " " +
      bodyPart +
      " " +
      difficultyLevel +
      " " +
      duration +
      " " +
      equipmentNeeded;

    console.log("Filter form submitted with query:", query);

    // Fetch videos based on the filter form
    fetchVideos(query);
  });

  // Event listener for the workout form
  $("#workout-form").on("submit", function (e) {
    e.preventDefault();

    var fitnessGoals = $("#fitnessGoals").val();
    var dietGoals = $("#dietGoals").val();
    var mealType = $("#mealType").val();
    var caloriesRange = $("#caloriesRange").val();

    var query =
      fitnessGoals + " " + dietGoals + " " + mealType + " " + caloriesRange;

    // Store the query in localStorage
    localStorage.setItem("query", query);

    // Fetch videos based on the workout form
    fetchVideos(query);

    // Redirect to the Exercise.html page
    window.location.href = "Exercise.html";
  });

  // function to generate default content

  // function generateDefualtContent() {
  //   for (let i = 0; i < 16; i++) {
  //     $("#exercises").append(
  //       $("#exercises").append(
  //         '<div class="video-content-wrap"><h3>Default Title ' +
  //           (i + 1) +
  //           "</h3><p>Default Description " +
  //           (i + 1) +
  //           "</p></div>"
  //       )
  //     );
  //   }
  // }

  // Initialize Swiper

  // var swiper = new Swiper(".swiper-container", {
  //   slidesPerView: 4,
  //   spaceBetween: 30,
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

  // generateDefualtContent();
});
