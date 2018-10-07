"use strict";
const navSpans = document.querySelectorAll("nav span");
const projects = document.querySelectorAll("span.project:not(.grey-out)");
const modal = document.querySelector("#single-project");
const modalShadow = document.querySelector("#single-project-shadow");
const closeX = document.querySelector("p.close");

// navigation
navSpans.forEach(listenNav);
function listenNav(n) {
  n.addEventListener("click", navClicked);
  function navClicked(m) {
    navSpans.forEach(n => n.classList.add("uncheck"));
    m.target.classList.remove("uncheck");
    closeModal();
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
    // reset
    closeModal();
    // update
    let positionX = m.target.getBoundingClientRect().left;
    let positionY = m.target.getBoundingClientRect().top;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;
    modal.style.left = `${positionX}px`;
    modal.style.top = `${positionY}px`;
    enlargeModal();
    getData(m.target);
    function enlargeModal() {
      modal.style.padding = "4% 7%";
      let width = modal.getBoundingClientRect().width;
      if (
        width <
        viewportWidth / 2.5 // better make different sizes, small/medium/big
        // (positionX >= viewportWidth / 2 && width < positionX * 0.5) ||
        // (positionX < viewportWidth / 2 &&
        //   width < (viewportWidth - positionX) * 0.5)
      ) {
        width += (viewportWidth / 1000) * 60;
        modal.style.width = `${width}px`;
        modal.style.height = `${width}px`; // for the modal div, height and width are the same
        modal.style.left = `${positionX - width / 2}px`;
        modal.style.top = `${positionY - width / 2}px`;
        modalShadow.style.width = `${width}px`;
        modalShadow.style.height = `${width}px`; // for the modal div, height and width are the same
        modalShadow.style.left = `${positionX - width / 2 + 23}px`;
        modalShadow.style.top = `${positionY - width / 2 - 7}px`;
        setTimeout(enlargeModal, 1000 / 60);
      } else {
        let positionYInit = m.target.getBoundingClientRect().top;
        let scrollTopInit =
          window.pageYOffset ||
          (
            document.documentElement ||
            document.body.parentNode ||
            document.body
          ).scrollTop;
        window.addEventListener("scroll", syncScroll);
        function syncScroll() {
          let scrollTop =
            window.pageYOffset ||
            (
              document.documentElement ||
              document.body.parentNode ||
              document.body
            ).scrollTop; // !!! remember !!!
          modal.style.top = `${positionYInit -
            width / 2 -
            scrollTop +
            scrollTopInit}px`;
          modalShadow.style.top = `${positionYInit -
            width / 2 -
            scrollTop +
            scrollTopInit -
            7}px`;
        }
      }
    }
  }
}
// close single project modal
closeX.addEventListener("click", closeModal);

///////////////////////
function closeModal() {
  modal.style.width = "0";
  modal.style.height = "0";
  modal.style.left = "0";
  modal.style.left = "0";
  modal.style.padding = "0";
  modalShadow.style.width = "0";
  modalShadow.style.height = "0";
  modalShadow.style.left = "0";
  modalShadow.style.left = "0";
  // clear image inside modal, otherwise the next time a modal is opened, the previous image will show for a sec
  document.querySelector(".img img").setAttribute("src", "");
}