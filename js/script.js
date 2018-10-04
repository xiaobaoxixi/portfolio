"use strict";
// const menu = document.querySelector(".burger p");
// const aside = document.querySelector("aside");

// window.addEventListener("DOMContentLoaded", init);
// function init() {
//   menu.addEventListener("click", toggleAside);
// }
// function toggleAside() {
//   aside.classList.toggle("show");
//   menu.classList.toggle("show");
// }
const navSpans = document.querySelectorAll("nav span");
navSpans.forEach(listen);
function listen(n) {
  n.addEventListener("click", navClicked);
  function navClicked(m) {
    navSpans.forEach(n => n.classList.add("uncheck"));
    m.target.classList.remove("uncheck");
    let target = m.target.dataset.section;
    console.log(target);
    document.querySelector(`#${target}`).scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
