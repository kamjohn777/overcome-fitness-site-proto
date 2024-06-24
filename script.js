$(document).ready(function () {
  $("#menu-btn").on("click", function (e) {
    $("#nav-links").toggleClass("open");

    let isOpen = $("#nav-links").hasClass("open");
    $("#menu-btn i").attr("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });

  $("#nav-links a").on("click", function (e) {
    $("#nav-links").removeClass("open");
    $("#menu-btn i").attr("class", "ri-menu-line");
  });

  const scrollReavealOption = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
  };

  ScrollReveal().reveal(".header__content h1", {
    ...scrollReavealOption,
  });

  ScrollReveal().reveal(".header__content h2", {
    ...scrollReavealOption,
    delay: 500,
  });

  ScrollReveal().reveal(".header__content p", {
    ...scrollReavealOption,
    delay: 1000,
  });

  ScrollReveal().reveal(".header__btn", {
    ...scrollReavealOption,
    delay: 1500,
  });

  ScrollReveal().reveal(".about__card", {
    ...scrollReavealOption,
    duration: 1000,
    interval: 500,
    delay: 500, // Add this line
  });

  ScrollReveal().reveal(".trainer__card", {
    ...scrollReavealOption,
    interval: 500,
    delay: 500, // Add this line
  });

  ScrollReveal().reveal(".blog__card", {
    ...scrollReavealOption,
    interval: 500,
    delay: 1500,
  });

  const swiperInstance = new Swiper(".swiper", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  $(".search-input-div input").on("focus", function (e) {
    e.preventDefault();
    $(this).parent().addClass("active"); // Add the active class to the parent div
    $(this).siblings(".input-suggestions-wrap").addClass("active");
    $(this).siblings(".input-suggestions-wrap").slideDown(300);
  });

  $(".search-input-div input").on("blur", function (e) {
    $(this).parent().removeClass("active");
    $(this).siblings(".input-suggestions-wrap").removeClass("active");
    $(this).siblings(".input-suggestions-wrap").slideUp(300);
  });

  $("#workout-form").on("submit", function (e) {
    e.preventDefault();

    const fitnessGoals = $("#fitnessGoals").val();
    const dietGoals = $("#dietGoals").val();
    const mealType = $("#mealType").val();
    const caloriesRange = $("#caloriesRange").val();

    // Store the input values in localStorage
    localStorage.setItem("fitnessGoals", fitnessGoals);
    localStorage.setItem("dietGoals", dietGoals);
    localStorage.setItem("mealType", mealType);
    localStorage.setItem("caloriesRange", caloriesRange);

    // Redirect to the search results page
    window.location.href = "./Excercises.html";
  });

  $("#recipe-form-home").on("submit", function (e) {
    var fitnessGoals = $("#fitnessGoals").val();
    var dietGoals = $("#dietGoals").val();
    var mealType = $("#mealType").val();
    var caloriesRange = $("#caloriesRange").val();

    // Store the input values in localStorage
    localStorage.setItem("fitnessGoals", fitnessGoals);
    localStorage.setItem("dietGoals", dietGoals);
    localStorage.setItem("mealType", mealType);
    localStorage.setItem("caloriesRange", caloriesRange);

    // Redirect to the Recipes.html page
    window.location.href = "./Recipes.html";
  });

  // BMI Calculator
  $("#calculate-btn").on("click", function (e) {
    e.preventDefault();

    // let height = $("#height").val();
    let heightFeet = $("#height-feet").val();
  let heightInches = $("#height-inches").val();
    let weight = $("#weight").val();

    // Convert height from feet to meters and weight from lbs to kg
    // height = height * 0.3048;
    let height = (heightFeet * 12 + (+heightInches)) * 0.0254;
    weight = weight * 0.453592;

    // Calculate BMI
    let bmi = weight / Math.pow(height, 2);

    // Display the BMI result
    $("#bmi-result").text(bmi.toFixed(2));

    // return false;
  });
});
