"use strict";
const nav = document.querySelector("nav.main");
const svgIntro = document.querySelector("svg#intro");
const allLinesInWeb = document.querySelectorAll("#lines *");
//const letterIParts = document.querySelectorAll("g#i *");
const letterI = document.querySelector("#i line");
const amSentence = document.querySelector(".amSentence");
const web = document.querySelector("#lines");
const triangleStrokes = document.querySelector(".triangleParts");
const t1 = document.querySelector(".t1");
const t2 = document.querySelector(".t2");
const t3 = document.querySelector(".t3");
const svgMain = document.querySelector("svg#changingShape");
const rollingPart = document.querySelector(".rolling");
const triangle = document.querySelector(".triangle");
const square = document.querySelector(".square");
const pentagon = document.querySelector(".pentagon");
const hexagon = document.querySelector(".hexagon");
const octagon = document.querySelector(".octagon");
const chart = document.querySelector(".chart");
const about = document.querySelector("#about");
// const h1 = document.querySelector("h1");
// let h1CollapseState = false;
let svgShrunkState = false;
let timeout;
const windowHeight = window.innerHeight;

window.addEventListener("DOMContentLoaded", init);

function init() {
  const tl = new TimelineMax();
  tl
    //.to(head, 0.3, { opacity: 1 })
    .staggerFrom(
      allLinesInWeb,
      0.7,
      {
        x: () => Math.random() * 3000 - 1500,
        y: () => Math.random() * 3000 - 1500
      },
      0.02,
      "-=.3"
    )
    // .staggerTo(
    //   letterIParts,
    //   0.3,
    //   {
    //     fill: "#444"
    //   },
    //   0
    // )
    .to(
      letterI,
      0.3,
      {
        scaleX: 0.67,
        scaleY: 0.18,
        y: 110
      },
      "-=.1"
    )
    //  .to(head, 0.3, { scale: 0.45, x: -10, y: 60 }, "-=.3")
    .to(amSentence, 0.6, { opacity: 1 }, "+=.3")
    .to(amSentence, 1.5, { x: 0 })
    .to(amSentence, 0.3, { opacity: 0 })
    .call(changeText)
    .to(amSentence, 0.6, { opacity: 1 })
    .staggerTo(
      allLinesInWeb,
      0.3,
      { stroke: "white", opacity: 0.7 },
      0.01,
      "+=2"
    )
    .to(web, 0.7, { x: 230, y: -50, scale: 2 }, "-=.7")
    .to(letterI, 0.7, { x: -235, y: -6, scaleY: 1.3 }, "-=.7")
    .to(
      //      [amSentence, head],
      amSentence,
      0.5,
      {
        x: -220,
        y: -429,
        scale: 0
      },
      "-=.5"
    )
    .call(showNav, this, "-=.7")
    .call(showtriangleParts, this, "-=.2")
    .to(letterI, 0.1, { opacity: 0 }, "-=.1")
    .to(t1, 0.3, { rotation: -60 })
    .to(triangleStrokes, 0.3, { rotation: 30, transformOrigin: "left bottom" })
    .to(t3, 0.3, { rotation: 60, transformOrigin: "left bottom" })
    .call(collapseSvgIntro)
    .call(turnAndChange);

  function changeText() {
    amSentence.textContent =
      "am curious, learn fast & always go one step further";
  }
  function showNav() {
    nav.classList.remove("hide");
  }
  function showtriangleParts() {
    triangleStrokes.classList.remove("hide");
  }
  function collapseSvgIntro() {
    svgIntro.style.height = "0";
  }
}
function turnAndChange() {
  svgMain.classList.remove("hide");
  triangleStrokes.classList.add("hide");
  chart.classList.remove("hide");
  about.classList.remove("hide");
  //  console.log(document.scrollingElement.scrollTop);
  // document.scrollingElement.scrollTop = `0`;
  let angle = 0;
  triangleTurn();
  // from triangle to square
  function triangleTurn() {
    triangle.setAttribute("fill", "transparent"); // need fill because otherwise mouse enter/leave only triggers when crossing stroke
    rollingPart.setAttribute("fill", "var(--fill)");
    rollingPart.setAttribute("transform", `rotate(${angle} 200 400)`);
    triangle.nextElementSibling.nextElementSibling.style.display = "inherit";
    if (angle < 150) {
      angle += 150 / 60;
      timeout = setTimeout(triangleTurn, 1000 / 60);
    } else {
      clearTimeout(timeout);
      turnToSquare();
    }
  }
}

let topPointPositionY = 400;
let bottomPointPositionY = 400;
let rightBorderPosition = 286.6;
//200 350, 286.6 350, 286.6 450, 200 450
function turnToSquare() {
  rollingPart.setAttribute("transform", "");
  if (topPointPositionY > 350) {
    topPointPositionY--;
    bottomPointPositionY++;
    rightBorderPosition += 0.268;
    rollingPart.setAttribute(
      "points",
      `200 ${topPointPositionY}, ${rightBorderPosition} 350, ${rightBorderPosition} 450, 200 ${bottomPointPositionY}`
    );
    timeout = setTimeout(turnToSquare, 3);
  } else {
    clearTimeout(timeout);
    square.classList.remove("hide");
    square.nextElementSibling.nextElementSibling.style.display = "inherit";
    square.setAttribute("fill", "transparent");
    squareTurn();
    listProjectGroup(square);
  }
}
// from square to pentagon
let angle2 = 0;
let bottomLeftPositionX = 300;
let bottomPositionY = 490;
let bottomRightPositionX = 400;
let centerBottomPositionY = 490;
function squareTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle2} 300 420)`);
  if (angle2 < 180) {
    angle2 += 180 / 60;
    timeout = setTimeout(squareTurn, 1000 / 60);
  } else {
    clearTimeout(timeout);
    rollingPart.setAttribute("transform", "");
    turnToPentagon();
  }
  function turnToPentagon() {
    if (bottomRightPositionX < 430) {
      bottomRightPositionX += 30 / 50; // in 50 steps therefor divide by 50
      bottomLeftPositionX -= 30 / 50;
      bottomPositionY -= 6 / 50;
      centerBottomPositionY += 50 / 50;
      rollingPart.setAttribute(
        "points",
        `300 390, 400 390, ${bottomRightPositionX} ${bottomPositionY},350 ${centerBottomPositionY},${bottomLeftPositionX} ${bottomPositionY}`
      );
      timeout = setTimeout(turnToPentagon, 3);
    } else {
      clearTimeout(timeout);
      pentagon.classList.remove("hide");
      pentagon.nextElementSibling.nextElementSibling.style.display = "inherit";
      pentagon.setAttribute("fill", "transparent");
      pentagonTurn();
      listProjectGroup(pentagon);
    }
  }
}
// from pentagon to hexagon
let angle3 = 0;
//390 316, 470 260, 550 316, 520 410, 420 410
let pentagonBottomLeftPositionX = 420;
let pentagonBottomRightPositionX = 520;
let pentagonBottomPositionY = 410;
let pentagonBottomCenterPositionY = 410;
let pentagonTopCenterPositionY = 260;
function pentagonTurn() {
  rollingPart.setAttribute("transform", `rotate(${angle3} 410 400)`);
  if (angle3 < 180) {
    angle3 += 180 / 60;
    timeout = setTimeout(pentagonTurn, 1000 / 60);
  } else {
    clearTimeout(timeout);
    rollingPart.setAttribute("transform", "");
    turnToHexagon();
  }
  function turnToHexagon() {
    if (pentagonBottomLeftPositionX > 390) {
      pentagonBottomLeftPositionX -= 30 / 50;
      pentagonBottomRightPositionX += 30 / 50;
      pentagonBottomPositionY -= 5 / 50;
      pentagonBottomCenterPositionY += 40 / 50;
      pentagonTopCenterPositionY += 10 / 50;
      rollingPart.setAttribute(
        "points",
        `390 316, 470 ${pentagonTopCenterPositionY}, 550 316, ${pentagonBottomRightPositionX} ${pentagonBottomPositionY}, 470 ${pentagonBottomCenterPositionY}, ${pentagonBottomLeftPositionX} ${pentagonBottomPositionY}`
      );
      timeout = setTimeout(turnToHexagon, 3);
    } else {
      clearTimeout(timeout);
      hexagon.classList.remove("hide");
      hexagon.nextElementSibling.nextElementSibling.style.display = "inherit";
      hexagon.setAttribute("fill", "transparent");
      hexagonTurn();
      listProjectGroup(hexagon);
    }
  }
}
// from hexagon to octagon
let angle4 = 0;
let scale = 1;
let translateX = 0;
let translateY = 0;
let hexagonPoint1X = 533;
let hexagonPoint1Y = 213;
let hexagonPoint2X = 620;
let hexagonPoint2Y = 157;
let hexagonPoint3X = 709;
let hexagonPoint3Y = 211;
let hexagonPoint4X = 709;
let hexagonPoint4Y = 315;
let hexagonPoint5X = 620;
let hexagonPoint5Y = 367;
let hexagonPoint6X = 533;
let hexagonPoint6Y = 315;
let addedPoint1X = 530;
let addedPoint2X = 713;
function hexagonTurn() {
  rollingPart.setAttribute(
    "transform",
    `rotate(${angle4} 635 363) scale(${scale}) `
  );
  if (angle4 < 120) {
    angle4++;
    scale += 0.0015;
    timeout = setTimeout(hexagonTurn, 3); // because of scaling, not using 1000/60 as previous steps
  } else {
    clearTimeout(timeout);
    rollingPart.setAttribute("transform", "");
    turnToOctagon();
  }
  //         530 210, 623 155, 713 210,          713 315, 623 368, 530 315
  //516 262, 548 187, 623 155, 698 187, 730 262, 698 337, 623 369, 548 337
  //518 262, 550 187, 625 155, 700 187, 732 262, 700 337, 625 369, 550 337
  function turnToOctagon() {
    if (addedPoint1X > 518) {
      addedPoint1X -= 10 / 50;
      hexagonPoint1X += 14 / 50;
      hexagonPoint1Y -= 22 / 50;
      hexagonPoint3X -= 7 / 50;
      hexagonPoint3Y -= 20 / 50;
      addedPoint2X += 16 / 50;
      hexagonPoint4X -= 7 / 50;
      hexagonPoint4Y += 18 / 50;
      hexagonPoint6X += 14 / 50;
      hexagonPoint6Y += 18 / 50;
      rollingPart.setAttribute(
        "points",
        `${addedPoint1X} 262, ${hexagonPoint1X} ${hexagonPoint1Y}, 623 155, ${hexagonPoint3X} ${hexagonPoint3Y}, ${addedPoint2X} 262, ${hexagonPoint4X} ${hexagonPoint4Y}, 623 369, ${hexagonPoint6X} ${hexagonPoint6Y}`
      );
      timeout = setTimeout(turnToOctagon, 3);
    } else {
      clearTimeout(timeout);
      octagon.nextElementSibling.nextElementSibling.style.display = "inherit";
      // extendH1();
      //hide rollingpart, show octagon
      rollingPart.classList.add("hide");
      octagon.classList.remove("hide");
      octagon.setAttribute("fill", "var(--fill)");
      listProjectGroup(octagon);
    }
  }
}

///////////////////////////////////
function listProjectGroup(elem) {
  clearOtherFill();
  fill(elem);
  let targetY2 = elem.nextElementSibling.getAttribute("y3");
  let currentY2 = elem.nextElementSibling.getAttribute("y2");
  showVertiLine();
  function showVertiLine() {
    if (currentY2 < targetY2 - 1) {
      // because of the ease method below, currentY2 will always be smaller than targetY2, need -1 to stop
      currentY2 = elem.nextElementSibling.getAttribute("y2");
      elem.nextElementSibling.setAttribute(
        "y2",
        `${Number(currentY2) + Number(targetY2 - currentY2) / 10}`
      ); // ease-in effect
      //              m.target.removeEventListener("mouseleave", removeFill); // so when svg scrolls up, won't trigger mouse leave;
      if (
        document.scrollingElement.scrollTop <
        windowHeight * 0.22 // restrict scroll, no need to move all the way up and lose polygons out of sight
      ) {
        document.scrollingElement.scrollTop = `${document.scrollingElement
          .scrollTop +
          Number(targetY2 - currentY2) / 7}`; // use document.scrollingElement.scrollTop instead of document.body.scrollTop, which always gives 0
      }
      let groupCount =
        elem.nextElementSibling.nextElementSibling.nextElementSibling
          .children[0].children.length;
      elem.nextElementSibling.nextElementSibling.nextElementSibling.children[0].style.height = `${groupCount *
        24}px`;
      timeout = setTimeout(showVertiLine, 1000 / 60);
    } else {
      //clearTimeout(timeout);
    }
  }
  const groupArea =
    elem.nextElementSibling.nextElementSibling.nextElementSibling;
  groupArea.addEventListener("mouseenter", hoverEachGroup);
  const projectsArea =
    elem.nextElementSibling.nextElementSibling.nextElementSibling
      .nextElementSibling;
  projectsArea.addEventListener("mouseenter", hoverEachGroup2);
  let group = elem.nextElementSibling.nextElementSibling.textContent;
  let projects = document.querySelector(`.${group}.project-group`);
  let horiLinesInGroup = document.querySelectorAll(`.${group}.hori-line`);
  horiLinesInGroup.forEach(extendEachHoriLine);
  function extendEachHoriLine(hl) {
    let targetX = Number(hl.getAttribute("x3"));
    let currentX = Number(hl.getAttribute("x2"));
    extend();
    function extend() {
      if (currentX < targetX - 1) {
        currentX = Number(hl.getAttribute("x2"));
        hl.setAttribute("x2", `${currentX + (targetX - currentX) / 20}`);
        timeout = setTimeout(extend, 10);
      }
    }
  }
  projects.classList.remove("hide");

  function hoverEachGroup(m) {
    document.querySelectorAll("polygon").forEach(p => {
      p.setAttribute("fill", "transparent");
    });
    // fill the corresponding polygon
    m.target.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
      "fill",
      "var(--fill)"
    );
  }
  function hoverEachGroup2(m) {
    document.querySelectorAll("polygon").forEach(p => {
      p.setAttribute("fill", "transparent");
    });
    // fill the corresponding polygon
    m.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.setAttribute(
      "fill",
      "var(--fill)"
    );
  }
}
///////////////////////////////////
function clearOtherFill() {
  document.querySelectorAll("#changingShape polygon").forEach(p => {
    p.setAttribute("fill", "transparent");
    p.removeEventListener("mouseleave", removeFill); // so that when svg is shrinking and mouse leaves the polygon area, the fill won't be removed
    p.removeEventListener("mouseenter", fill); // so that hover doesn't trigger fill anymore when svg is used at corner as nav
  });
}

function fill(elem) {
  octagon.setAttribute("fill", "transparent"); // because after animation, octagon has fill
  elem.setAttribute("fill", "var(--fill)");
  elem.previousElementSibling.classList.remove("hide");
}
function removeFill(m) {
  m.target.setAttribute("fill", "transparent");
}

function shrinkSVG() {
  if (svgShrunkState === false) {
    let currentSVGPosition = -14;
    let currentSVGWidth = 190;
    shrinkAndMove();
    function shrinkAndMove() {
      if (currentSVGPosition > -23) {
        //      svg.style.top = `${currentSVGPosition}vw`;
        svgMain.style.width = `${currentSVGWidth}vw`;
        currentSVGPosition--;
        currentSVGWidth -= 13;
        timeout = setTimeout(shrinkAndMove, 500 / 60);
      } else {
        clearTimeout(timeout);
      }
    }
    svgShrunkState = true;
  }
}
//////////////////////////////////
// leave 1 polygon with fill
// temp h1 animation needs to be changed
// when show line and scroll up, shouldn't trigger mouse leave
// highlight group area
// foreignObject mouseenter trigger not always working
// give timeout individual name in order to control cancal
// when show verticle line, check if already in view then no scroll down
