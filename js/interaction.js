"use strict";
const navSpans = document.querySelectorAll("nav span");
const projects = document.querySelectorAll("span.project:not(.grey-out)");
const modal = document.querySelector("#single-project");
const modalShadow = document.querySelector("#single-project-shadow");
const closeX = document.querySelector("p.close");
const burger = document.querySelector(".burger");
let notClickedNav = true;
let notClickedDot = 1;
// navigation
navSpans.forEach(listenNav);
function listenNav(n) {
  n.addEventListener("click", navClicked);
  function navClicked(m) {
    notClickedNav = false; // so that when click on nav, the automatic highlight nav function doesn't run. otherwise nav will flash, because of scrolling position
    navSpans.forEach(n => n.classList.add("uncheck"));
    m.target.classList.remove("uncheck");
    closeModal();
    let target = m.target.dataset.section;
    console.log(target);
    /* if (window.innerWidth < 768 && target === "changingShape") {
      document.querySelector(`#projects-mobile`).scrollIntoView({
        block: "start",
        inline: "nearest",
        behavior: "smooth"
      });
    } else { */
    document.querySelector(`#${target}`).scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
    //}
    nav.classList.remove("show");
    setTimeout(function() {
      notClickedNav = true;
    }, 1000); // temp solution
  }
}
// in mobile version, click burger show nav
burger.addEventListener("click", toggleNav);
function toggleNav() {
  nav.classList.toggle("show");
  // if (nav.className.indexOf("show") > -1) {
  //   nav.style.height = "auto";
  // } else {
  //   nav.classList.remove("show");
  //   nav.style.height = "auto";
  // }
}
// display single project
projects.forEach(listenProject);
function listenProject(p) {
  p.addEventListener("mouseenter", animateDot);

  // a delay timer if decide to use mouseenter to to trigger mocal box
  //  p.addEventListener("mouseenter", timingCount);
  // function timingCount(m) {
  //   let ms = 0;
  //   let timerIntervel = setInterval(timer, 10);
  //   function timer() {
  //     ms++;
  //     if (ms === 31) {
  //       showSingleProject(m);
  //     }
  //   }
  // }
  p.addEventListener("click", showSingleProject);
  function showSingleProject(m) {
    // change dot image to 'seen'
    m.target.querySelector("img").classList.add("seen");
    m.target.querySelector("img.seen").setAttribute("src", "img/dot-seen.png");
    // don't run random dot animation anymore
    notClickedDot++;
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
        viewportWidth / 1.9 // better make different sizes, small/medium/big
        // (positionX >= viewportWidth / 2 && width < positionX * 0.5) ||
        // (positionX < viewportWidth / 2 &&
        //   width < (viewportWidth - positionX) * 0.5)
      ) {
        width += (viewportWidth / 1500) * 60;
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

// hint scroll

// scroll page and turn web symbol
let scrollHistory = [];
let angle = 0;
window.addEventListener("scroll", whileScroll);
function whileScroll(m) {
  scrollHistory.push(window.pageYOffset);
  if (scrollHistory.length > 1) {
    let newPosition = scrollHistory[scrollHistory.length - 1];
    let previousPosition = scrollHistory[scrollHistory.length - 2];
    if (newPosition !== previousPosition) {
      angle += newPosition - previousPosition;
      // web.setAttribute(
      //   "transform",
      //   `scale(2.2) translate(-488, -178) rotate(${angle / 8.8} 1185 424.7)` // angel divide by a number so that the turning is not too much
      // );
      web.setAttribute(
        "transform",
        `scale(.4) translate(2594, 1580) rotate(${angle / 7} 1185 424.7)` // angel divide by a number so that the turning is not too much
      );
    }
  }
}
function animateDot(m) {
  let img = m.target.querySelector("img");
  img.classList.add("animate");
  if (img.className.indexOf("seen") < 0) {
    img.setAttribute("src", "img/dot-hover.png");
  }
  img.parentElement.addEventListener("mouseleave", function() {
    img.classList.remove("animate");
    if (img.className.indexOf("seen") < 0) {
      img.setAttribute("src", "img/dot.png");
    }
  });
}

// random animation dots
setInterval(generateRandomDot, 700);
function generateRandomDot() {
  if (notClickedDot <= 3) {
    let randomNr = Math.floor(Math.random() * projects.length);
    let randomDot = projects[randomNr].querySelector("img");
    randomDot.classList.add("random");
    setTimeout(function() {
      randomDot.classList.remove("random");
    }, 600);
    // chosen.addEventListener("animationend", function() {
    //   chosen.classList.remove("random");
    // });
  }
}

// scroll to section, nav highlight changes accordingly
window.addEventListener("scroll", detectSectionPosition);
function detectSectionPosition() {
  if (notClickedNav) {
    let sections = [];
    sections.push(document.querySelector("#current"));
    sections.push(document.querySelector("#future"));
    sections.push(document.querySelector("#about"));
    sections.push(svgMain);
    sections.forEach(checkPosition);
    function checkPosition(s) {
      let sectionName = s.getAttribute("id");
      if (
        s.getBoundingClientRect().top < 70 &&
        s.getBoundingClientRect().top > -70
      ) {
        navSpans.forEach(n => n.classList.add("uncheck"));
        document
          .querySelector(`nav.main span[data-section='${sectionName}']`)
          .classList.remove("uncheck");
      }
      if (
        sectionName === "changingShape" &&
        s.getBoundingClientRect().top > -500
      ) {
        navSpans.forEach(n => n.classList.add("uncheck"));
        document
          .querySelector(`nav.main span[data-section='changingShape']`)
          .classList.remove("uncheck");
      }
      if (
        sectionName === "about" &&
        s.getBoundingClientRect().top <
          window.innerHeight - s.getBoundingClientRect().height - 57
      ) {
        // for wide screen, the last section 'about' might not reach to the top of the screen
        navSpans.forEach(n => n.classList.add("uncheck"));
        document
          .querySelector(`nav.main span[data-section='about']`)
          .classList.remove("uncheck");
      }
    }
  }
}

// clear anywhere outside to close modal
window.addEventListener("click", checkClickPosition);
function checkClickPosition(m) {
  if (m.target !== modal) {
    closeModal();
  }
}
