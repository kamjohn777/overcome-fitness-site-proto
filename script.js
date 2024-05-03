$(document).ready(function () {
  $("#menu-btn").on("click", function (e) {
    $("#nav-links").toggleClass("open");

    let isOpen = $("#nav-links").hasClass("open");
    $("#menu-btn i").attr("class", isOpen ? "ri-close-line" : "ri-menu-line");
  });
});
