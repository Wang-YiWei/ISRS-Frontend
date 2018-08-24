var hero_container = document.querySelector('.hero-container');

document.addEventListener("DOMContentLoaded", function() {
  if (!hero_container) return !1;
  var origin_src = hero_container.getAttribute("data-src"),
      img = new Image;

  img.src = origin_src;
  img.onload = function () {
    hero_container.style.backgroundImage = "-webkit-gradient(linear, left top, right top, color-stop(50%, rgba(255, 255, 255, 0.25)), to(rgba(255, 255, 255, 0.3))), url('" + origin_src + "')";
    hero_container.style.backgroundImage = "-webkit-linear-gradient(left, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.3) 100%), url('" + origin_src + "')";
    hero_container.style.backgroundImage = "-o-linear-gradient(left, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.3) 100%), url('" + origin_src + "')";
    hero_container.style.backgroundImage = "linear-gradient(to right, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.3) 100%), url('" + origin_src + "')";
  };
});