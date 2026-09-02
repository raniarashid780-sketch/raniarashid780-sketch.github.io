// Adds a background/blur to the nav once the page is scrolled — the only
// behavior that isn't achievable with pure HTML/CSS.
const nav = document.getElementById("site-nav");

function updateNav() {
  if (window.scrollY > 24) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNav, { passive: true });
updateNav();
