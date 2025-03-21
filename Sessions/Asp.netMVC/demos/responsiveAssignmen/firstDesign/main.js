let toggleMenu = document.querySelector(".nav .container .toggle-menu");
let toggleLinks = document.querySelector(".nav .toggle-nav-links");
toggleMenu.addEventListener("click", function () {
  toggleLinks.classList.toggle("active");
});
