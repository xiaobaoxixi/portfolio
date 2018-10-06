"use strict";
const navSpans = document.querySelectorAll("nav span");
const projects = document.querySelectorAll(".project-group li span");
const modal = document.querySelector("#single-project");

// navigation
navSpans.forEach(listenNav);
function listenNav(n) {
  n.addEventListener("click", navClicked);
  function navClicked(m) {
    navSpans.forEach(n => n.classList.add("uncheck"));
    m.target.classList.remove("uncheck");
    modal.classList.remove("show");
    let target = m.target.dataset.section;
    document.querySelector(`#${target}`).scrollIntoView({
      block: "center",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
// display single project
projects.forEach(listenProject);
function listenProject(p) {
  p.addEventListener("click", showSingleProject);
  function showSingleProject(m) {
    console.log(m.target);
    modal.classList.add("show");
  }
}
