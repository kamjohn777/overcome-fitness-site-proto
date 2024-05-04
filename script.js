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
});
