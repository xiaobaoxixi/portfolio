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
    let positionX = m.target.getBoundingClientRect().left;
    let positionY = m.target.getBoundingClientRect().top;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    console.log(viewportWidth, viewportHeight);
    modal.style.left = `${positionX}px`;
    modal.style.top = `${positionY}px`;
    enlargeModal();
    function enlargeModal() {
      let width = modal.getBoundingClientRect().width;
      if (
        (positionX >= viewportWidth / 2 && width < positionX * 2) ||
        (positionX < viewportWidth / 2 &&
          width < (viewportWidth - positionX) * 2)
      ) {
        // modal should cover whole screen, when the clicked element is in the right half of the screen, make sure modal extend to the left edge of the screen
        width += (viewportWidth / 1000) * 60;
        modal.style.width = `${width}px`;
        modal.style.height = `${width}px`; // for the modal div, height and width are the same
        modal.style.left = `${positionX - width / 2}px`;
        modal.style.top = `${positionY - width / 2}px`;
        setTimeout(enlargeModal, 1000 / 60);
      }
    }
  }
}
