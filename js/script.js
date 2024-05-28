document.querySelector(".openbtn").addEventListener("click", function () {
  this.classList.toggle("active");
  document.getElementById("g-nav").classList.toggle("panelactive");
  document.querySelector(".circle-bg").classList.toggle("circleactive");
  document.querySelector("body").classList.toggle("open-menu");
});

document.querySelectorAll("#g-nav a").forEach(function (link) {
  link.addEventListener("click", function () {
    document.querySelector(".openbtn").classList.remove("active");

    document.getElementById("g-nav").classList.remove("panelactive");

    document.querySelector(".circle-bg").classList.remove("circleactive");
  });
});
