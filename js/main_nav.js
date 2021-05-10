let body = document.body;

let overlay = document.getElementById("main-nav");

let navBurguer = document.getElementById("main-nav__burguer");

let overlayMenu = document.getElementById("main-nav__menu-items");

let logoElement = document.querySelector(".homepage-hero__logo");

let smallLogo = document.getElementById("main-nav__logo");

let logoScrollOffset = 80;

if (logoElement) {
  // Calculate logo's height
  let logoHeight = logoElement.offsetHeight;
  // Calculate space that exist between logo and the very top of the viewport
  let logoOffsetTop = logoElement.offsetTop;

  logoScrollOffset = logoHeight + logoOffsetTop;

  /*
   * This function recalculates the values of logo's height and
   * the space between logo and the very top of the viewport
   * when a user makes resize of the window
   */
  window.addEventListener("resize", function() {
    logoHeight = logoElement.offsetHeight;
    logoOffsetTop = logoElement.offsetTop;
    window.scrollY >= logoHeight + logoOffsetTop
      ? overlay.classList.add("main-nav--colored")
      : overlay.classList.remove("main-nav--colored");
  });
}

navBurguer.addEventListener("click", function() {
  this.classList.toggle("burguer-animation");
  overlay.classList.toggle("main-nav--overlay");
  overlayMenu.classList.toggle("main-nav__menu-items-animation");
  body.classList.toggle("non-scroll");

  if (window.scrollY === 0) {
    overlay.classList.toggle("main-nav--colored");
  }
});

/*
 *This function makes the navbar's logo appears
 *when the user scrolls down
 */
window.addEventListener("scroll", function() {
  window.scrollY >= 80
    ? overlay.classList.add("main-nav--colored")
    : overlay.classList.remove("main-nav--colored");

  window.scrollY >= logoScrollOffset
    ? smallLogo.classList.add("main-nav__logo--visible")
    : smallLogo.classList.remove("main-nav__logo--visible");
});
